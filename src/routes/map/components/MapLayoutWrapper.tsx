import React, { Fragment } from 'react';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import ModalProjectView from 'Components/ProjectModal/ModalProjectView';
import Analytics from 'Components/Work/Drawers/Analytics';
import Status from 'Components/Work/Drawers/Status';
import Filter from 'Components/Work/Drawers/Filter';
import NavbarView from 'Components/Shared/Navbar/NavbarView';
import { Layout } from 'antd';
import { FiltersContext } from 'utils/filterContext';
import SidebarView from 'Components/Shared/Sidebar/SidebarView';

const MapLayoutWrapper: React.FC = ({ children }) => {
  const {
    showModalProject,
    completeProjectData,
    locality,
    year,
    tabKey,
    showCreateProject,
    problemId,
    showBoardStatus,
    showFilters,
    visibleCreateProject,
    showAnalytics,
  } = useRequestState();
  const {
    setShowModalProject,
    setShowCreateProject,
    setVisibleCreateProject,
  } = useRequestDispatch();

  return (
    <Fragment>
      {
        showModalProject &&
        <ModalProjectView
          visible={showModalProject}
          setVisible={setShowModalProject}
          data={completeProjectData}
          showDefaultTab={true}
          locality={locality}
          editable={true}
          year={year}
        />
      }
      {
        showCreateProject &&
        <ModalProjectView
          visible={showCreateProject}
          setVisible={setShowCreateProject}
          data={"no data"}
          showDefaultTab={true}
          locality={locality}
          editable={true}
          problemId={problemId}
          year={year}
        />
      }
      {
        visibleCreateProject &&
        <ModalProjectView
          visible={visibleCreateProject}
          setVisible={setVisibleCreateProject}
          data={"no data"}
          defaultTab={tabKey}
          locality={locality}
          editable={true}
          year={year}
        />
      }
      { showAnalytics && <Analytics /> }
      { showBoardStatus && <Status /> }
      { showFilters && <Filter/> }
      <Layout key={'main-map'}>
        <NavbarView />
        <FiltersContext>
        <Layout>
          <SidebarView></SidebarView>
          <Layout className="map-00">
            {children}
          </Layout>
        </Layout>
        </FiltersContext>
      </Layout>
    </Fragment>
  );
};

export default MapLayoutWrapper;
