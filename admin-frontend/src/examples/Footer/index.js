import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

import typography from 'assets/theme/base/typography';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => {
      let IconComponent;

      if (link.name === 'Facebook') {
        IconComponent = <FacebookIcon fontSize="small" sx={{ color: 'darkgreen', ml: 1 }} />;
      } else if (link.name === 'Twitter') {
        IconComponent = <TwitterIcon fontSize="small" sx={{ color: 'darkgreen', ml: 1 }} />;
      } else if (link.name === 'WhatsApp') {
        IconComponent = <WhatsAppIcon fontSize="small" sx={{ color: 'darkgreen', ml: 1 }} />;
      }

      return (
        <MDBox key={link.name} component="li" px={2} lineHeight={1}>
          <Link href={link.href} target="_blank" style={{ display: 'flex', alignItems: 'center' }}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              {link.name}
            </MDTypography>
            {IconComponent}
          </Link>
        </MDBox>
      );
    });

  return (
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
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, made with
        <MDBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
          <Icon color="inherit" fontSize="inherit">
            favorite
          </Icon>
        </MDBox>
        by
        <Link href={href} target="_blank">
          <MDTypography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
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
        {renderLinks()}
      </MDBox>
    </MDBox>
  );
}

Footer.defaultProps = {
  company: { name: 'Cosimo' },
  links: [
    { href: 'https://www.facebook.com', name: 'Facebook' },
    { href: 'https://www.twitter.com', name: 'Twitter' },
    { href: 'https://wa.me/2348108962585', name: 'WhatsApp' },
  ],
};

Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
