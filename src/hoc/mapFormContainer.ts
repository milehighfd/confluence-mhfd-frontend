import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getReverseGeocode, 
        savePolygonCoordinates, 
        saveMarkerCoordinates, 
        saveNewCapitalForm, 
        saveNewProjectWithCoords,
        saveNewStudyForm,
        saveNewMaintenanceForm,
        clearErrorMessage,
        setRouteRedirect,
        filterProjects } from '../store/actions/mapActions';

import mapFormData from './mapFormData';

const mapStateToProps = (state: any) => {
    return {
        problems: state.map.problems,
        projects: state.map.projects,
        components: state.map.components,
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
        saveNewProjectWithCoords,
        saveNewStudyForm,
        saveNewMaintenanceForm,
        clearErrorMessage,
        setRouteRedirect,
        filterProjects
    }, dispatch)
});
  
export default (WrappedComponent : any, layers : any) => connect(mapStateToProps, mapDispatchToProps)(mapFormData(WrappedComponent, layers));