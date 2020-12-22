import { navigate } from 'gatsby'
import React from 'react'

import ContactUs from '../components/ContactUs'

const Contact = () => <ContactUs onClose={() => navigate('/')}></ContactUs>

export default Contact
