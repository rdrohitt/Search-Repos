jest.mock('common/theme')
import Enzyme, { shallow, mount } from 'enzyme'
import HeaderComponent  from './header'
import Adapter from "enzyme-adapter-react-16"
import { httpService } from '../../data-access/httpService'

Enzyme.configure({adapter: new Adapter()})
const baseProps = {
   setSearch: {} as any
}

describe(HeaderComponent, () => {
    let mountedComponent: Enzyme.ReactWrapper

    beforeEach(() => {
      mountedComponent = Enzyme.mount(<HeaderComponent {...baseProps}/>)
    })
    afterEach(() => {
      mountedComponent.unmount()
    })

    // whether the component renders or not 
    it('renders', () => {
          expect(mountedComponent.exists()).toBe(true)
          expect(mountedComponent.find('[data-automation-id="headerComponent"]')).not.toHaveLength(0)
    });

    // Check button text
    it('should check button text', () => {
        const headerComponent = mountedComponent.find('[data-automation-id="searchButton"]')
        expect(headerComponent.getElements()[0].props.primaryButtonText).toEqual('Search')
    })
      
});

  
