jest.mock('common/theme')
import Enzyme, { shallow, mount } from 'enzyme'
import SearchRepos  from './searchRepos'
import Adapter from "enzyme-adapter-react-16"
import { httpService } from '../../data-access/httpService'

Enzyme.configure({adapter: new Adapter()})
describe(SearchRepos, () => {
    let mountedComponent: Enzyme.ReactWrapper

    beforeEach(() => {
      mountedComponent = Enzyme.mount(<SearchRepos />)
    })
    afterEach(() => {
      mountedComponent.unmount()
    })

    // whether the component renders or not 
    it('renders', () => {
          expect(mountedComponent.exists()).toBe(true)
          expect(mountedComponent.find('[data-automation-id="searchComponent"]')).not.toHaveLength(0)
    });

    it('should find component', () => {
        const searchComponentRegion = mountedComponent.find('[data-automation-id="searchComponent"]')
        expect(searchComponentRegion.getElements().length).toBeGreaterThan(0)
      })

});
