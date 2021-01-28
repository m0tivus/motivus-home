#!/usr/bin/env node
import { Construct } from '@aws-cdk/core'
import { HttpsRedirect } from '@aws-cdk/aws-route53-patterns'
import cloudfront = require('@aws-cdk/aws-cloudfront')
import route53 = require('@aws-cdk/aws-route53')
import s3 = require('@aws-cdk/aws-s3')
import s3deploy = require('@aws-cdk/aws-s3-deployment')
import acm = require('@aws-cdk/aws-certificatemanager')
import cdk = require('@aws-cdk/core')
import targets = require('@aws-cdk/aws-route53-targets/lib')

export interface StaticSiteProps {
  domainName: string
  siteSubDomain: string
}

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 *
 * https://github.com/aws-samples/aws-cdk-examples/blob/cf0c6e46683b8dc9638f12a28fcb444865aede75/typescript/static-site/static-site.ts
 */
export class StaticSite extends Construct {
  constructor(parent: Construct, name: string, props: StaticSiteProps) {
    super(parent, name)

    const zone = route53.HostedZone.fromLookup(this, 'Zone', {
      domainName: props.domainName,
    })
    const siteDomain = props.siteSubDomain + '.' + props.domainName
    new cdk.CfnOutput(this, 'Site', { value: 'https://' + siteDomain })

    // Content bucket
    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: props.domainName,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,

      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })
    new cdk.CfnOutput(this, 'Bucket', { value: siteBucket.bucketName })

    // TLS certificate
    const certificateArn = new acm.DnsValidatedCertificate(
      this,
      'SiteCertificate',
      {
        domainName: props.domainName,
        hostedZone: zone,
        region: 'us-east-1',
        subjectAlternativeNames: [siteDomain],
      },
    ).certificateArn
    new cdk.CfnOutput(this, 'Certificate', { value: certificateArn })

    // CloudFront distribution that provides HTTPS
    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'SiteDistribution',
      {
        aliasConfiguration: {
          acmCertRef: certificateArn,
          names: [props.domainName, siteDomain],
          sslMethod: cloudfront.SSLMethod.SNI,
          securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
        },
        originConfigs: [
          {
            customOriginSource: {
              domainName: siteBucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      },
    )
    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
    })

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: props.domainName,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution),
      ),
      zone,
    })

    new route53.CnameRecord(this, 'SiteCNameRecord', {
      domainName: props.domainName,
      recordName: siteDomain,
      zone,
    })

    // new HttpsRedirect(this, 'Redirect', {
    //   zone,
    //   recordNames: [siteDomain],
    //   targetDomain: props.domainName,
    // })

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3deploy.Source.asset('../public')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    })
  }
}
