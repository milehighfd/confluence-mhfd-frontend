// import * as types from '../types/userTypes';

const initState = {
    polygons: [
        {
            id: '1',
            coordinates: [
                [-105.06420012782819, 39.81026323699689],
                [-105.05016547189382, 39.801761786974225],
                [-105.01563740444797, 39.801962845665514],
                [-105.00209398965409, 39.812460308375904],
                [-105.01509394926418, 39.826239809470394],
                [-105.03848620156825, 39.83144526752935],
                [-105.05653931104531, 39.82425471026178],
                [-105.06420012782819, 39.81026323699689]
            ]
        },
        {
            id: '2',
            coordinates: [
                [-104.94271733364056, 39.80902390918499],
                [-104.93309484040513, 39.821736685950924],
                [-104.91038575636954, 39.8335604136673],
                [-104.8853672739572, 39.83060467251207],
                [-104.8853672739572, 39.81434582280457],
                [-104.90384246096927, 39.80015313755828],
                [-104.92732134446368, 39.80015313755828],
                [-104.94271733364056, 39.80902390918499]
            ]
        },
        {
            id: '3',
            coordinates: [
                [-104.85994340215153, 39.77514841494917],
                [-104.83872293246881, 39.77721479372536],
                [-104.81408934978604, 39.76745236895647],
                [-104.80716115465655, 39.75147450575187],
                [-104.82101754491552, 39.74111650339108],
                [-104.84873032543346, 39.74466799390473],
                [-104.85758301921013, 39.7576885597112],
                [-104.85994340215153, 39.77514841494917]
            ]
        },
        {
            id: '4',
            coordinates: [
                [-105.00144312624077, 39.76261082027116],
                [-105.02360295987883, 39.7613643976824],
                [-105.03873650480247, 39.75263880786656],
                [-105.02954828109867, 39.737262460068905],
                [-105.00666528009111, 39.729368215189425],
                [-104.98413774065709, 39.732381245118376],
                [-104.9874026014447, 39.75070767312556],
                [-105.00144312624077, 39.76261082027116]
            ]
        }
    ],
    components: [
        {
            id: 'comp1',
            coordinates: [
                [-105.00678964730282, 39.82517491705079],
                [-105.00762077207199, 39.82092555878796],
                [-105.00294402258662, 39.821099789922386],
                [-105.0031449187985, 39.824311517701204],
                [-105.00678964730282, 39.82517491705079]
            ]
        },
        {
            id: 'comp2',
            coordinates: [
                [-105.0110363830156, 39.804763700061244],
                [-105.01186750778476, 39.80051434179842],
                [-105.00719075829939, 39.80068857293284],
                [-105.0069330845055, 39.80362217914154],
                [-105.0110363830156, 39.804763700061244]
            ]
        },
        {
            id: 'comp3',
            coordinates: [
                [-105.03620004995867, 39.79835077739452],
                [-105.03703117472783, 39.79410141913169],
                [-105.03235442524246, 39.794275650266115],
                [-105.03209675144858, 39.797209256474815],
                [-105.03620004995867, 39.79835077739452]
            ]
        },
        {
            id: 'comp4',
            coordinates: [
                [-105.03596379426749, 39.83908124694051],
                [-105.03679491903665, 39.834831888677684],
                [-105.03211816955128, 39.83500611981211],
                [-105.0318604957574, 39.83793972602081],
                [-105.03596379426749, 39.83908124694051]
            ]
        },
        {
            id: 'comp5',
            coordinates: [
                [-105.03609048531352, 39.76589941774358],
                [-105.03692161008269, 39.76165005948076],
                [-105.03224486059732, 39.76182429061518],
                [-105.03198718680343, 39.76475789682388],
                [-105.03609048531352, 39.76589941774358]
            ]
        },
        {
            id: 'comp6',
            coordinates: [
                [-105.02319249898396, 39.729928914835114],
                [-105.02402362375312, 39.72567955657229],
                [-105.01934687426775, 39.72585378770671],
                [-105.01908920047387, 39.72878739391541],
                [-105.02319249898396, 39.729928914835114]
            ]
        },
        {
            id: 'comp7',
            coordinates: [
                [-104.99081236446784, 39.73012142325817],
                [-104.991643489237, 39.72587206499534],
                [-104.98696673975164, 39.726046296129766],
                [-104.98670906595775, 39.728979902338466],
                [-104.99081236446784, 39.73012142325817]
            ]
        },
        {
            id: 'comp8',
            coordinates: [
                [-104.98663152143963, 39.760378029230594],
                [-104.9874626462088, 39.75612867096777],
                [-104.98278589672343, 39.75630290210219],
                [-104.98252822292955, 39.75923650831089],
                [-104.98663152143963, 39.760378029230594]
            ]
        }
    ]
}

const mapReducer = (state = initState, action : any) => {
    switch(action.type) {
        default: 
            return state;
    }
}

export default mapReducer;