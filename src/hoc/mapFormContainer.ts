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
        getMapTables } from '../store/actions/mapActions';
import { getProjectWithFilters, removeFilter, getDropdownFilters } from '../store/actions/filterActions';

import mapFormData from './mapFormData';

const mapStateToProps = (state: any) => {
    return {
        problems: state.map.problems,
        projects: state.map.projects,
        components: state.map.components,
        filters: state.filter.filters,
        dropdowns: state.filter.dropdowns,
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
        getDropdownFilters
    }, dispatch)
});
  
export default (WrappedComponent : any, layers : any) => connect(mapStateToProps, mapDispatchToProps)(mapFormData(WrappedComponent, layers));