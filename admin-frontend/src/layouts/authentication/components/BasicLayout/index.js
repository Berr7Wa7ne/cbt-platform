import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';

import MDBox from 'components/MDBox';

import DefaultNavbar from 'examples/Navbars/DefaultNavbar';
import PageLayout from 'examples/LayoutContainers/PageLayout';

import Footer from 'layouts/authentication/components/Footer';
import greenlogo from 'assets/images/greenlogo.png';
import Box from '@mui/material/Box';

function BasicLayout({ image, children }) {
  return (
    <PageLayout>
      <DefaultNavbar
        brand={<Box component="img" src={greenlogo} alt="Green Logo" sx={{ height: '40px' }} />}
      />
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6),
            )}, url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      <Footer light />
    </PageLayout>
  );
}

BasicLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
