import { Row, Tag } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FILTER_PROBLEMS_TRIGGER, PROBLEMS_TRIGGER } from 'constants/constants';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { useProfileState } from 'hook/profileHook';
import { elementCost } from 'utils/utils';
import CardInformationView from 'Components/Shared/CardInformation/CardInformationView';
import LoadingView from 'Components/Loading/LoadingView';

const GenericTabView = ({
    totalElements,
    type,
    cardInformation,
}: {
    totalElements: number,
    type: string,
    cardInformation: any[]
}) => {
    const {
      getGalleryProblems,
      getGalleryProjects,
      setFilterProblemOptions,
      setFilterProjectOptions,
      setFilterComponentOptions,
      setZoomProjectOrProblem,
      favoriteList,
      getExtraProjects,
      setFilterTabNumber
    } = useMapDispatch();
    const { setNextPageOfCards, setInfiniteScrollItems, setInfiniteScrollHasMoreItems } = useProjectDispatch();
    const { nextPageOfCards, infiniteScrollHasMoreItems, infiniteScrollItems } = useProjectState();
    
    const { userInformation: user } = useProfileState();

    const [data, setData] = useState<any>([]);
    const [carInfo, setCardInfo] = useState<any>([]);

    const {
        filterProblemOptions,
        filterProjectOptions,
        filterComponentOptions,
        selectedOnMap,
        favorites,
        paramFilters: params
      } = useMapState();
    let totalElement = cardInformation?.length || 0;
    const [isLoading, setIsLoading] = useState(false);
    const size = 20;
    let sw = false;
    if (totalElement) {
        sw = true;
    }

    useEffect(() => {
        if (nextPageOfCards === 1) {
            console.log('entro')
            let div = document.getElementsByClassName('infinite-scroll-component')[0]
            if (div) div.scrollTop = 0;
        }
    }, [nextPageOfCards]);

    useEffect(() => {
        favoriteList(type === 'Problems');    
    }, [user]);

    const deleteFavorite = (id: number) => {
        // TODO: fix the logic of this , dont get again the list of favorites
        // only update the variable with a favorites.filter 
        setTimeout(() => {
            favoriteList(type === 'Problems');
        }, 1000);
    }

    useEffect(() => {
        if (cardInformation) {
            const a = Math.ceil(cardInformation.length / 20) + 1
            if(( nextPageOfCards + 1 ) === a) {
                setNextPageOfCards(a)
            }
        }
        if (favorites && carInfo) {
            setData(
                carInfo.map((ci: any) => {
                    return {
                        ...ci,
                        isFavorite: favorites.some((f: any) => (f.project_id && f.project_id === ci.project_id) || (f.problem_id && f.problem_id === ci.problemid))
                    }

                })
            )
        }
        setCardInfo(cardInformation);
    }, [favorites, cardInformation]);

    const deleteFilter = (tag: string, value: string) => {
        const auxFilterComponents = { ...filterComponentOptions };
        const valueTag = tag === 'estimatedcost' ? filterComponentOptions[tag] : filterComponentOptions[tag].split(',');
        const auxValueTag = [] as Array<string>;
        for (let index = 0; index < valueTag.length; index++) {
            const element = valueTag[index];
            if (element !== value) {
                auxValueTag.push(element);
            }
        }
        let newValue = '';
        for (let index = 0; index < auxValueTag.length; index++) {
            const element = auxValueTag[index];
            if (element !== '') {
                newValue = newValue ? (newValue + ',' + element) : element;
            }
        }
        auxFilterComponents[tag] = tag === 'estimatedcost' ? auxValueTag : newValue;
        setFilterComponentOptions(auxFilterComponents);
        getGalleryProjects();
        getGalleryProblems();
    }
    const deleteTagProblem = (tag: string, value: string) => {
        const auxFilterProblems = { ...filterProblemOptions };
        const valueTag = tag === 'cost' ? filterProblemOptions[tag] : filterProblemOptions[tag].split(',');
        const auxValueTag = [] as Array<string>;
        for (let index = 0; index < valueTag.length; index++) {
            const element = valueTag[index];
            if (element !== value) {
                auxValueTag.push(element);
            }
        }
        let newValue = '';
        for (let index = 0; index < auxValueTag.length; index++) {
            const element = auxValueTag[index];
            if (element !== '') {
                newValue = newValue ? (newValue + ',' + element) : element;
            }
        }
        auxFilterProblems[tag] = tag === 'cost' ? auxValueTag : newValue;
        setFilterProblemOptions(auxFilterProblems);
        getGalleryProblems();
    }
    const deleteTagProject = (tag: string, value: string) => {
        const auxFilterProjects = { ...filterProjectOptions };
        const valueTag = (tag === 'mhfddollarsallocated' || tag === 'totalcost') ? filterProjectOptions[tag] : filterProjectOptions[tag].split(',');
        const auxValueTag = [] as Array<string>;
        for (let index = 0; index < valueTag.length; index++) {
            const element = valueTag[index];
            if (element !== value) {
                auxValueTag.push(element);
            }
        }
        let newValue = '';
        for (let index = 0; index < auxValueTag.length; index++) {
            const element = auxValueTag[index];
            if (element !== '') {
                newValue = newValue ? (newValue + ',' + element) : element;
            }
        }
        auxFilterProjects[tag] = (tag === 'mhfddollarsallocated' || tag === 'totalcost') ? auxValueTag : newValue;
        setFilterProjectOptions(auxFilterProjects);
        getGalleryProjects();;
    }

    const tagComponents = [] as any;
    for (const key in filterComponentOptions) {
        const tag = {
            key,
            values: key === 'estimatedcost' ? filterComponentOptions[key] : filterComponentOptions[key].split(',')
        }
        tagComponents.push(tag);
    }

    useEffect(() => {
        setInfiniteScrollHasMoreItems(true);
        setIsLoading(false);
        if(type === FILTER_PROBLEMS_TRIGGER){
            setFilterTabNumber(PROBLEMS_TRIGGER)
        }
    }, [totalElement])

    const tagProblems = [] as any;
    const tagProjects = [] as any;

    const fetchMoreData = async () => {
    if (infiniteScrollItems.length < totalElements) {
        if (!isLoading) {
            setIsLoading(true);
            getExtraProjects(nextPageOfCards);
        }
        const nextItems = infiniteScrollItems.concat(Array.from({ length: size }));
        setInfiniteScrollItems(nextItems);
        setInfiniteScrollHasMoreItems(true);
    }
    };
    return (
        <div className="scroll-cards" style={{ height: 'auto', overflowY: 'hidden' }}>
            {isLoading && <LoadingView/>}
            <div className="hastag" style={{ minHeight: 34 }}>
                <div style={{ marginBottom: totalElements ? 0 : 5 }}>
                {type === FILTER_PROBLEMS_TRIGGER ? tagProblems.map((tag: { key: string, values: Array<string> }, index: number) => {
                    return <>
                        {tag.values.map((element: string) => {
                            let value = '';
                            if (tag.key === 'cost') {
                                const tagValues = element.split(',');
                                value = elementCost(+tagValues[0], +tagValues[1]);
                            } else {
                                if (tag.key === 'solutionstatus') {
                                    value = element === '10' ? '10% - 25%' : element === '25'? '25% - 50%': element === '50' ? '50% - 75%' : '75% - 100%';
                                } else {
                                    if (tag.key === 'components') {
                                        value = (params.problems?.components?.filter((elementComponent: any) => elementComponent.key === element)[0] as any) ?
                                                params.problems?.components?.filter((elementComponent: any) => elementComponent.key === element)[0].value as any : ''
                                    } else {
                                        value = element;
                                    }
                                }
                            }
                            return element && <Tag key={index + element + tag.key} closable onClose={() => deleteTagProblem(tag.key, element)}>
                                {value}
                            </Tag>
                        })}
                    </>
                }) : tagProjects.map((tag: { key: string, values: Array<string> }, index: number) => {
                    return <>
                        {tag.values.map((element: string) => {
                            let value = '';
                            if (tag.key === 'totalcost' || tag.key === 'mhfddollarsallocated') {
                                const tagValues = element.split(',');
                                value = elementCost(+tagValues[0], +tagValues[1]);
                            } else {
                                value = element;
                            }
                            return element && <Tag key={index + element + tag.key} closable onClose={() => deleteTagProject(tag.key, element)}>
                                {value}
                            </Tag>
                        })}
                    </>
                })}
                {tagComponents.map((tag: { key: string, values: Array<string> }, index: number) => {
                    return <Fragment key={tag.key}>
                        {tag.values.map((element: string) => {
                            let value = '';
                            if (tag.key === 'estimatedcost') {
                                const tagValues = element.split(',');
                                value = elementCost(+tagValues[0], +tagValues[1]);
                            } else {
                                if (tag.key === 'component_type') {
                                    value = (params.components?.component_type?.filter((elementComponent: any) => elementComponent.key === element)[0] as any) ?
                                            params.components?.component_type?.filter((elementComponent: any) => elementComponent.key === element)[0].value as any : ''
                                } else {
                                    value = element;
                                }
                            }
                            return element && <Tag key={index + element + tag.key} closable onClose={() => deleteFilter(tag.key, element)}>
                                {value}
                            </Tag>
                        })}
                    </Fragment>
                })}
            </div>
        </div>
        <Row className="card-map" id='card-on-map' gutter={[16, 16]} >
            <InfiniteScroll
                dataLength={totalElement}
                next={fetchMoreData}
                hasMore={infiniteScrollHasMoreItems}
                height={window.innerHeight - 245}
                className="scroll-infinite-mobile"
                endMessage={''}
                scrollableTarget="card-on-map"
                loader={<></>}>
                {sw ? infiniteScrollItems.map((_: any, index: number) => {
                    return data[index] && <CardInformationView  
                        key={index}
                        data={data[index]}
                        type={type}
                        selectedOnMap={selectedOnMap}
                        setZoomProjectOrProblem={setZoomProjectOrProblem}
                        deleteCallback={deleteFavorite}
                    />
                }) : ''}
            </InfiniteScroll>
        </Row>
    </div>
    )
};

export default GenericTabView;
