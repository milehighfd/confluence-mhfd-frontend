import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import RequestView from 'Components/Work/Request/RequestView';
import { ModalProjectView } from 'Components/ProjectModal/ModalProjectView';
import Analytics from 'Components/Work/Drawers/Analytics';
import Status from 'Components/Work/Drawers/Status';
import Filter from 'Components/Work/Drawers/Filter';
import Navbar from 'Components/Shared/Navbar/NavbarContainer';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { BoardDataRequest } from 'Components/Work/Request/RequestTypes';
import { Layout } from 'antd';
import SidebarView from 'Components/Shared/Sidebar/SidebarView';
import { AlertStatus } from 'Components/Work/Request/AlertStatus';

const RequestLayout = () => {
  const location = useLocation();
  const type = location.pathname === '/work-request' ? 'WORK_REQUEST' : 'WORK_PLAN';
  const {
    showModalProject,
    completeProjectData,
    locality,
    year,
    tabKey,
    tabKeys,
    showCreateProject,
    problemId,
    showAnalytics,
    sumByCounty,
    sumTotal,
    totalCountyBudget,
    namespaceId,
    showBoardStatus,
    boardStatus,
    boardSubstatus,
    boardComment,
    showFilters,
    jurisdictionFilterList,
    csaFilterList,
    prioritySelected,
    jurisdictionSelected,
    csaSelected,
    localityType,
    visibleCreateProject,
    showAlert,
    alertStatus,
  } = useRequestState();
  const {
    setShowModalProject,
    setShowCreateProject,
    setShowAnalytics,
    setShowBoardStatus,
    setAlertStatus,
    setShowAlert,
    setShowFilters,
    setPrioritySelected,
    setJurisdictionSelected,
    setCsaSelected,
    setVisibleCreateProject
  } = useRequestDispatch();
  const currentDataForBoard: BoardDataRequest = {
    type,
    year: `${year}`,
    locality,
    projecttype: tabKey ? tabKey : tabKeys[0],
    position: ''
  };

  const onUpdateBoard = () => {
    //This fn is intented to be used to reload getBoardData2
  }

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
          currentData={currentDataForBoard}
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
          currentData={currentDataForBoard}
          year={year}
        />
      }
      {
        <Analytics
          type={type}
          visible={showAnalytics}
          setVisible={setShowAnalytics}
          tabKey={tabKey}
          data={sumByCounty}
          totals={sumTotal}
          initialYear={year}
          totalCountyBudget={totalCountyBudget}
          boardId={namespaceId}
        />
      }
      {
        showBoardStatus &&
        <Status
          locality={locality}
          boardId={namespaceId}
          visible={showBoardStatus}
          setVisible={setShowBoardStatus}
          status={boardStatus}
          substatus={boardSubstatus}
          comment={boardComment}
          type={type}
          setAlertStatus={setAlertStatus}
          setShowAlert={setShowAlert}
          onUpdateHandler={onUpdateBoard}
        />
      }
      {
        showFilters && <Filter
          visible={showFilters}
          setVisible={setShowFilters}
          jurisdictionFilterList={jurisdictionFilterList}
          csaFilterList={csaFilterList}
          selPS={prioritySelected}
          selJS={jurisdictionSelected}
          selCS={csaSelected}
          setJS={setJurisdictionSelected}
          setCS={setCsaSelected}
          setPS={setPrioritySelected}
          l={localityType}
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
          currentData={currentDataForBoard}
          year={year}
        />
      }
      <Layout>
        <Navbar />
        <Layout>
          <SidebarView />
          {
            showAlert &&
            <AlertStatus type={alertStatus.type} message={alertStatus.message} />
          }
          <RequestView
            type={type}
            isFirstRendering={true}
          />
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default RequestLayout;
