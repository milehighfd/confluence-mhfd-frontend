import React, { useState, useEffect } from 'react';
import { Input, Row, Dropdown, Button, Menu, MenuProps } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
// import CardsView from "./CardsView";
import { SORTED_PROBLEMS, SORTED_PROJECTS } from '../../../constants/constants';
import { useMapDispatch } from '../../../hook/mapHook';
import { useDetailedState } from '../../../hook/detailedHook';
import CardInformationView from 'Components/Shared/CardInformation/CardInformationView';
import * as datasets from "../../../Config/datasets";
import { SERVER } from 'Config/Server.config';
import { getCurrentProjectStatus } from 'utils/parsers';
import LoadingViewOverall from 'Components/Loading-overall/LoadingViewOverall';
import { useProfileState } from 'hook/profileHook';

const { Search } = Input;

const CardsList = ({
  type,
  getCount,
}: {
  type: string,
  getCount: Function,
}) => {
  const { detailed } = useDetailedState();
  const [data, setData] = useState<Array<Object>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const updateFavoritesAndCount = (id: number) => {
    if (type === 'Projects') {      
      setData((data: Array<Object>) => {
        return data.filter((d: any) => d.project_id !== id)
      })
      getCount();     
    } else {
      setData((data: Array<Object>) => {
        return data.filter((d: any) => d.problemid !== id)
      })
      getCount(); 
    }
  }

  const getProjectCards = () =>{
    if (type === 'Projects') {
      setIsLoading(true)
      datasets.getData(SERVER.FAVORITE_PROJECTS, datasets.getToken()).then(result => {
        setData(result.map((project: any) => {
          const projectType = project?.code_project_type?.project_type_name;
          const x = {
            cartodb_id: project.project_id,
            project_id: project.project_id,
            // TODO: MISSING IMAGES
            // FEMA Grant Management
            // Letter of Map Change
            // FHAD to PMR (PMR)
            // Development Improvement Project (DIP)
            // General Maintenance
            // Permitting
            // Maintenance Eligibiity Project (MEP)
            // Research and Development (RD)
            image: (
              projectType === 'CIP' ? '/projectImages/capital.png' :
                projectType === 'Study' ? '/projectImages/study.png' :
                  projectType === 'Special' ? '/projectImages/special.png' :
                    projectType === 'Vegetation Management' ? '/projectImages/vegetation-management.png' :
                      projectType === 'Sediment Removal' ? '/projectImages/sediment-removal.png' :
                        projectType === 'Restoration' ? '/projectImages/restoration.png' :
                          projectType === 'General Maintenance' ? '/projectImages/minor-repairs.png' :
                            projectType === 'Acquisition' ? '/projectImages/acquisition.png' :
                              projectType === 'Routine Trash and Debris' ? '/projectImages/debris-management.png' : '/projectImages/watershed-change.png'
            ),
            requestName: project.project_name,
            sponsor: project.sponsor,
            estimatedCost: project.estimatedcost ? project.estimatedcost : project.finalcost,
            componentCost: project.component_cost ? project.component_cost : 0,
            status: getCurrentProjectStatus(project)?.code_phase_type?.code_status_type?.status_name,
            projecttype: projectType,
            objectid: project.objectid,
            type: project.type,
            value: project.cartodb_id,
            id: project.projectId,
            totalComponents: parseInt(project.GRADE_CONTROL_STRUCTURE +
              project.PIPE_APPURTENANCES +
              project.SPECIAL_ITEM_POINT +
              project.SPECIAL_ITEM_LINEAR +
              project.SPECIAL_ITEM_AREA +
              project.CHANNEL_IMPROVEMENTS_LINEAR +
              project.CHANNEL_IMPROVEMENTS_AREA +
              project.REMOVAL_LINE +
              project.REMOVAL_AREA +
              project.STORM_DRAIN +
              project.DETENTION_FACILITIES +
              project.MAINTENANCE_TRAILS +
              project.LAND_ACQUISITION +
              project.LANDSCAPING_AREA) ,
            isFavorite: true
            // coordinates: project.coordinates[0]
          }
          setIsLoading(false)
          return x;
        }
        ));
        setIsLoading(false)
      });
      
    } else {
      setIsLoading(true)
      datasets.getData(SERVER.FAVORITE_PROBLEMS, datasets.getToken()).then(result => {
        setData(result.map((problem: any) => {
          setIsLoading(false)
          return {
            cartodb_id: problem.cartodb_id,
            image: `gallery/${problem.problemtype}.png`,
            requestName: problem.problemname,
            jurisdiction: problem.jurisdiction,
            estimatedCost: problem.estimatedcost,
            componentCost: problem.component_cost ? problem.component_cost: 0,
            field4: 'X',
            field5: 'Components',
            priority: problem.problempriority,
            percentage: problem.solutionstatus ? problem.solutionstatus : 0,
            problemid: problem.problemid,
            id: problem.problem_id,
            type: problem.type,
            value: problem.cartodb_id,
            totalComponents: problem.totalComponents,
            coordinates: problem.coordinates[0],
            isFavorite: true
          }
        }));
        setIsLoading(false)
      })
     
    }

  }
  useEffect(() => {
    getProjectCards();
  }, []);

  let totalElement = data.length;
  const size = 8;
  let sw = false;
  if (totalElement) {
    sw = true;
  }
  const valueDropdown = type === 'Problems' ? SORTED_PROBLEMS : SORTED_PROJECTS;
  const [options, setOptions] = useState({ keyword: "", column: type === 'Problems' ? 'problemname' : 'projectname', order: "asc"});

  const [state, setState] = useState({
    items: Array.from({ length: size }),
    hasMore: true
  });

  const { deleteFavorite } = useMapDispatch();
  useEffect(() => {
    const auxState = { ...state };
    auxState.hasMore = true;
    setState(auxState);
  }, [totalElement])


  
  const fetchMoreData = () => {
    if (state.items.length >= totalElement - size) {
      const auxState = { ...state };
      if (state.items.length !== data.length) {
        auxState.items = state.items.concat(Array.from({ length: totalElement - state.items.length }));
      }
      auxState.hasMore = false;
      setState(auxState);
      return;
    }
    setTimeout(() => {
      const auxState = { ...state };
      auxState.items = state.items.concat(Array.from({ length: size }));
      setState(auxState);
      // setIsLoading(false)
    }, 500);
  };
  return(
    <Row style={{ background: '#fff', marginTop: '-4px', marginRight: '-2px', marginLeft: '-20px', width:'100%' }} className="card-map profile-mobile" gutter={[16, 16]}>
      {/* <div style={{ width: '100%', marginBottom: '-38px' }}></div> */}
      {isLoading && <LoadingViewOverall />}
      <div style={{ width: '100%', marginBottom: '-38px' }}>
        <InfiniteScroll
          dataLength={state.items.length}
          next={fetchMoreData}
          hasMore={state.hasMore}
          height={window.innerHeight - 200}
          className="scroll-infinite-mobile"
          endMessage={''}
          loader={state.items.length ? <h4 style={{paddingLeft:'12px'}}></h4>: ''}>
          {sw ? state.items.map((i, index: number) => {
            return data[index] && <CardInformationView
              key={index}
              data={data[index]}
              type={type}
              deleteCallback={updateFavoritesAndCount}
              isProfile = {true}
            />
          }) : ''}
        </InfiniteScroll>
      </div>
    </Row>
  )
};

export default CardsList;

