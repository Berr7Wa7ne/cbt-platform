import Grid from '@mui/material/Grid';

import MDBox from 'components/MDBox';

import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart';
import ReportsLineChart from 'examples/Charts/LineCharts/ReportsLineChart';
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard';

import reportsBarChartData from 'layouts/dashboard/data/reportsBarChartData';
import reportsLineChartData from 'layouts/dashboard/data/reportsLineChartData';

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Total Students Card */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="school"
                title="Total Students"
                count={500}
                percentage={{
                  color: 'success',
                  amount: '+5%',
                  label: 'since last month',
                }}
              />
            </MDBox>
          </Grid>

          {/* Total Courses Card */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="book"
                title="Total Courses"
                count={120}
                percentage={{
                  color: 'success',
                  amount: '+2%',
                  label: 'added recently',
                }}
              />
            </MDBox>
          </Grid>

          {/* Total Exams Card */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="quiz"
                title="Total Exams"
                count={75}
                percentage={{
                  color: 'warning',
                  amount: '-1%',
                  label: 'compared to last session',
                }}
              />
            </MDBox>
          </Grid>

          {/* Students Enrolled in Exams Card */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="people"
                title="Students Enrolled"
                count={320}
                percentage={{
                  color: 'success',
                  amount: '+10%',
                  label: 'since last session',
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Course Completion Rate"
                  description="Completion status of ongoing courses"
                  date="updated 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Exam Performance"
                  description={
                    <>
                      (<strong>+15%</strong>) improvement in average scores.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Exam Enrollment Trend"
                  description="Student enrollment for upcoming exams"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
