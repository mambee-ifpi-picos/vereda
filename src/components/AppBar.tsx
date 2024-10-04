import * as React from 'react'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useAuth } from '../context/AuthContext'
import Image from 'next/image'
import LoginIcon from '@mui/icons-material/Login'

interface PageType {
  title: string
  link: string
  protected?: boolean
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))

const pages: PageType[] = [
  { title: 'cursos', link: '/cursos' },
  { title: 'meu espaço', link: '/cursos/meu-espaco', protected: true },
]
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const { user, logOut } = useAuth()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleNavigation = (page: string) => {
    router.push(page)
    handleCloseNavMenu()
  }

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: '#1a202c', backgroundImage: 'none' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Image src="/static/logo.png" width={48} height={48} alt="logo" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Vereda
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) =>
                page.protected && !user.uid ? (
                  ''
                ) : (
                  <MenuItem
                    sx={{ textTransform: 'capitalize' }}
                    key={page.title}
                    onClick={() => handleNavigation(page.link)}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <Image src="/static/logo.png" width={32} height={32} alt="logo" />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Vereda
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {pages.map((page) =>
              page.protected && !user.uid ? (
                ''
              ) : (
                <Button
                  key={page.title}
                  onClick={() => handleNavigation(page.link)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              )
            )}
          </Box>

          {user.uid ? (
            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <LightTooltip title={`${user.name}`}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{
                      color: '#fff',
                      backgroundColor: '#313546',
                      border: '1px solid #ccc',
                    }}
                  >
                    <Image
                      src={user.photoURL || '/static/avatar.png'}
                      width={38}
                      height={38}
                      alt="avatar"
                    />
                  </Avatar>
                </IconButton>
              </LightTooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {settings.map((setting) => ( */}
                <MenuItem onClick={logOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
                {/* ))} */}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <MenuItem
                sx={{ textTransform: 'capitalize' }}
                onClick={() => handleNavigation('/login')}
              >
                <Typography marginRight={1} textAlign="center">
                  Login
                </Typography>
                <LoginIcon />
              </MenuItem>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
