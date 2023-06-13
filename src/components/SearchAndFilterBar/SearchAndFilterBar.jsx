import icon_search from '../../assets/svgs/search_icon.svg'
import {
    ContainerWrapperLeft,
    FilterWrapper,
    ContainerWrapperRight,
    SearchBarContainer,
    SearchIcon,
    SearchInput,
    FilterSetter,
    SearchBarWrapper
} from './SearchAndFilterBar.style.js'
import {useDispatch, useSelector} from 'react-redux'
import {setPostsFilter} from '../../store/slices/postsFilter'


const SearchAndFilterBar = () => {
    const dispatch = useDispatch()
    const selectedFilter = useSelector(store => store.postsFilter) //get state from redux

    const filters = ['All', 'Liked', 'Friends', 'Follow']

    return (
        <SearchBarContainer>
            <SearchBarWrapper>
                <ContainerWrapperLeft>
                    <SearchIcon src={icon_search} />
                    <SearchInput type="text" placeholder="Search posts..." />
                </ContainerWrapperLeft>
                <ContainerWrapperRight>
                    <FilterWrapper>
                        {filters.map(
                            filter => <FilterSetter filterActive={selectedFilter === filter} key={filter} onClick={() =>dispatch(setPostsFilter(filter))}>
                                {filter}
                            </FilterSetter>)}
                    </FilterWrapper>
                </ContainerWrapperRight>
            </SearchBarWrapper>
        </SearchBarContainer>
    )
}

export default SearchAndFilterBar
