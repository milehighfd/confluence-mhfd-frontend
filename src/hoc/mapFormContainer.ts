import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getReverseGeocode, 
        savePolygonCoordinates, 
        saveMarkerCoordinates, 
        saveNewCapitalForm, 
        saveNewStudyForm,
        createNewProjectForm,
        clearErrorMessage,
        setRouteRedirect,
        getMapTables,
        getPolygonStreams } from '../store/actions/mapActions';
import { getProjectWithFilters, removeFilter, getDropdownFilters, getUserFilters } from '../store/actions/filterActions';
import { saveDraftCard } from '../store/actions/panelActions';

import mapFormData from './mapFormData';

const mapStateToProps = (state: any) => {
    return {
        problems: state.map.problems,
        projects: state.map.projects,
        components: state.map.components,
        filters: state.filter.filters,
        panel: state.panel.projects,
        dropdowns: state.filter.dropdowns,
        userFiltered: state.filter.userFiltered,
        layerFilters: state.map.layers,
        error: state.map.error,
        redirect: state.map.redirect
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators({
        getReverseGeocode,
        savePolygonCoordinates,
        saveMarkerCoordinates,
        saveNewCapitalForm,
        saveNewStudyForm,
        createNewProjectForm,
        clearErrorMessage,
        setRouteRedirect,
        getProjectWithFilters,
        removeFilter,
        getMapTables,
        getDropdownFilters,
        getUserFilters,
        getPolygonStreams,
        saveDraftCard
    }, dispatch)
});
  
export default (WrappedComponent : any, layers : any) => connect(mapStateToProps, mapDispatchToProps)(mapFormData(WrappedComponent, layers));