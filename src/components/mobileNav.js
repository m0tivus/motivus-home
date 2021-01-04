import React from 'react'
import ToolbarComponent from './Mobil/Toolbar'
import DrawerComponent from './Mobil/Drawer'
import ContactUsDrawer from './ContactUsDrawer'

const MobileNav = ({ openContact, setOpenContact, ...props }) => {
  const [openNavigator, setOpenNavigator] = React.useState(false)

  const toggleNavigatorDrawer = () => {
    setOpenNavigator((prev) => !prev)
  }

  const openNavigatorDrawer = () => {
    setOpenNavigator(true)
  }

  const toggleDrawer = () => {
    setOpenContact(false)
  }

  return (
    <div className='App'>
      <ToolbarComponent openDrawerHandler={openNavigatorDrawer} />
      <DrawerComponent
        open={openNavigator}
        toggleDrawerHandler={toggleNavigatorDrawer}
      />
      <ContactUsDrawer
        open={openContact}
        onClose={toggleDrawer}
      ></ContactUsDrawer>
    </div>
  )
}

export default MobileNav
