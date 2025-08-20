import { styled } from '@linaria/react';
import AssemblyContainer from 'assembly/AssemblyContainer';
import AssemblyIcon from 'assembly/AssemblyIcon';
import { Subheading } from 'assembly/foundations/Typography';
import { RefSpacing } from 'assembly/foundations/designsystem/web/RefSpacing';
import { Anchor } from 'compatibility/traffic';
import SiteFooterWithData from 'components/SiteFooterWithData';
import SiteHeaderWithData from 'components/SiteHeaderWithData';
import SideNavLayout from 'components/layouts/SideNavLayout';
import { ToolHeader } from 'components/tools/shared';
import { ProductDomain } from 'config/enums';
import { RouteImportance } from 'global/QuizletBase';
import { withRequireAdmin } from 'pages/serverSideModules';
import { withAppData } from 'utils/data/globalAppData';
import { withHeaderData } from 'utils/data/headerData';

const ToolList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${RefSpacing.xSmall};

  margin-top: ${RefSpacing.medium};
`;

const ToolItem = styled.li`
  display: flex;
  flex-direction: row;
  gap: ${RefSpacing.xSmall};

  ${Subheading.Two}
`;

export const getServerSideProps = withAppData(withHeaderData, withRequireAdmin);

export default function ToolsPage() {
  return (
    <AssemblyContainer>
      <ToolHeader>Quizlet Tools</ToolHeader>
      <ToolList>
        <ToolItem>
          <AssemblyIcon icon="brand-expert-solutions" />
          <Anchor href="/tools/calculator">Calculator</Anchor>
        </ToolItem>
      </ToolList>
    </AssemblyContainer>
  );
}

ToolsPage.getLayout = function getLayout(page) {
  return (
    <SideNavLayout
      footer={<SiteFooterWithData />}
      header={<SiteHeaderWithData />}
    >
      {page}
    </SideNavLayout>
  );
};

ToolsPage.ownershipDomain = ProductDomain.LoggedOutContent;
ToolsPage.actionString = 'tools/index';
ToolsPage.routeImportance = RouteImportance.NORMAL;
