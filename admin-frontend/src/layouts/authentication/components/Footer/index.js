import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

import typography from 'assets/theme/base/typography';

function Footer({ light }) {
  const { size } = typography;

  return (
    <MDBox position="absolute" width="100%" bottom={0} py={4}>
      <Container>
        <MDBox
          width="100%"
          display="flex"
          flexDirection={{ xs: 'column', lg: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        >
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color={light ? 'white' : 'text'}
            fontSize={size.sm}
          >
            &copy; {new Date().getFullYear()}, made with
            <MDBox fontSize={size.md} color={light ? 'white' : 'dark'} mb={-0.5} mx={0.25}>
              <Icon color="inherit" fontSize="inherit">
                favorite
              </Icon>
            </MDBox>
            by
            <Link href="#" target="_blank">
              <MDTypography variant="button" fontWeight="medium" color={light ? 'white' : 'dark'}>
                &nbsp;Cosimo&nbsp;
              </MDTypography>
            </Link>
            for a better web.
          </MDBox>
          <MDBox
            component="ul"
            sx={({ breakpoints }) => ({
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              listStyle: 'none',
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up('lg')]: {
                mt: 0,
              },
            })}
          >
            <MDBox component="li" px={2} lineHeight={1} display="flex" alignItems="center">
              <Link
                href="https://www.facebook.com"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? 'white' : 'dark'}
                >
                  Facebook
                </MDTypography>
                <FacebookIcon fontSize="small" sx={{ mr: 1, color: 'darkgreen' }} />
              </Link>
            </MDBox>
            <MDBox component="li" px={2} lineHeight={1} display="flex" alignItems="center">
              <Link
                href="https://www.twitter.com"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? 'white' : 'dark'}
                >
                  Twitter
                </MDTypography>
                <TwitterIcon fontSize="small" sx={{ mr: 1, color: 'darkgreen' }} />
              </Link>
            </MDBox>
            <MDBox component="li" pl={2} lineHeight={1} display="flex" alignItems="center">
              <Link
                href="https://wa.me/2348108962585"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? 'white' : 'dark'}
                >
                  WhatsApp
                </MDTypography>
                <WhatsAppIcon fontSize="small" sx={{ mr: 1, color: 'darkgreen' }} />
              </Link>
            </MDBox>
          </MDBox>
        </MDBox>
      </Container>
    </MDBox>
  );
}

// Setting default props for the Footer
Footer.defaultProps = {
  light: false,
};

// Typechecking props for the Footer
Footer.propTypes = {
  light: PropTypes.bool,
};

export default Footer;
