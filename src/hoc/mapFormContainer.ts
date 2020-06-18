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
        getGalleryProblems, 
        getGalleryProjects,
        getPolygonStreams, saveLayersCheck } from '../store/actions/mapActions';
import { getProjectWithFilters, removeFilter, getDropdownFilters, getUserFilters, sortProjects } from '../store/actions/filterActions';
import { saveDraftCard, getUserProjects } from '../store/actions/panelActions';

import mapFormData from './mapFormData';
import { saveUserInformation } from '../store/actions/ProfileActions';

const mapStateToProps = (state: any) => {
    return {
        problems: state.map.problems,
        projects: state.map.projects,
        projectsByType: state.map.projectsByType,
        components: state.map.components,
        filters: state.filter.filters,
        panel: state.panel.projects,
        dropdowns: state.filter.dropdowns,
        userFiltered: state.filter.userFiltered,
        layerFilters: state.map.layers,
        error: state.map.error,
        redirect: state.map.redirect,
        latitude: state.profile.userInformation.coordinates.latitude,
        longitude: state.profile.userInformation.coordinates.longitude,
        galleryProblems: state.map.galleryProblems,
        galleryProjects: state.map.galleryProjects,
        // user: state.profile.userInformation
        polygon: state.profile.userInformation.polygon,
        selectedLayers: state.map.selectedLayers
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
        getGalleryProjects,
        getGalleryProblems,
        getDropdownFilters,
        getUserFilters,
        getPolygonStreams,
        saveDraftCard,
        getUserProjects,
        sortProjects,
        saveUserInformation,
        saveLayersCheck
    }, dispatch)
});
  
export default (WrappedComponent : any, layers : any) => connect(mapStateToProps, mapDispatchToProps)(mapFormData(WrappedComponent, layers));