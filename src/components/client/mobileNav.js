import React from 'react'
import ToolbarComponent from './mobil/ClientToolbar'
import DrawerComponent from './mobil/ClientDrawer'

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

  //console.log(openNavigator)

  return (
    <div className='App'>
      <ToolbarComponent openDrawerHandler={openNavigatorDrawer} />
      <DrawerComponent
        open={openNavigator}
        toggleDrawerHandler={toggleNavigatorDrawer}
      />
    </div>
  )
}

export default MobileNav
