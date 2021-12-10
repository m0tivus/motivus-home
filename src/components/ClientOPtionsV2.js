import { Grid } from '@material-ui/core'
import React from 'react'
import ClienOptionsCards from './CLientOptionsCards'
import { charactersList } from './CharacterList'

export default function ClientOptionsV2() {
  const cardsContent = charactersList

  return (
    <React.Fragment>
      <Grid container l={12} spacing={5}>
        {cardsContent.map((cardContent, i) => (
          <Grid item sm={6} xs={12} key={`ClientOptionsCard-${i}`}>
            <ClienOptionsCards
              title={cardContent.title}
              description={cardContent.description}
              Description={cardContent.Description}
              textButton={cardContent.textButton}
              actionButton={cardContent.actionButton}
              character={cardContent.character}
              item={cardContent.item}
              index={i}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}
