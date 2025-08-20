import AssemblyContainer from 'assembly/AssemblyContainer';
import { Anchor } from 'compatibility/traffic';
import SiteFooterWithData from 'components/SiteFooterWithData';
import SiteHeaderWithData from 'components/SiteHeaderWithData';
import SideNavLayout from 'components/layouts/SideNavLayout';
import Calculator from 'components/tools/calculator/Calculator';
import { ToolHeader } from 'components/tools/shared';
import { ProductDomain } from 'config/enums';
import { RouteImportance } from 'global/QuizletBase';
import { withRequireAdmin } from 'pages/serverSideModules';
import { withAppData } from 'utils/data/globalAppData';
import { withHeaderData } from 'utils/data/headerData';

export const getServerSideProps = withAppData(withHeaderData, withRequireAdmin);

export default function CalculatorPage() {
  return (
    <AssemblyContainer>
      <ToolHeader>Calculator</ToolHeader>
      <Anchor href="/tools">All Tools</Anchor>
      <Calculator />
    </AssemblyContainer>
  );
}

CalculatorPage.getLayout = function getLayout(page) {
  return (
    <SideNavLayout
      footer={<SiteFooterWithData />}
      header={<SiteHeaderWithData />}
    >
      {page}
    </SideNavLayout>
  );
};

CalculatorPage.ownershipDomain = ProductDomain.LoggedOutContent;
CalculatorPage.actionString = 'tools/calculator';
CalculatorPage.routeImportance = RouteImportance.NORMAL;
