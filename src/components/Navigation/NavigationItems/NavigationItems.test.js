import React from 'react' ;

import { configure , shallow } from 'enzyme' ;
import Adapter from 'enzyme-adapter-react-16' ;

import NavigationItems from './NavigationItems' ;

import NavigationItem from './NavigationItem/NavigationItem' ;

configure( { adapter : new Adapter() } )

describe( '<NavigationItems />' , () => {

    let wrapper;

    beforeEach( () => {
        //executed before each test
        wrapper = shallow( <NavigationItems /> )
    } )

    //Each tests run independently
    //E.g. If we want to set isAuthenticated to true in  multiple tests , We have to do that in each of the tests

    //with it() we create one unit test
    it( 'should render 2 <NavigationIntem /> elements if not authenticated' , () => {
        
        //const wrapper = shallow(<NavigationItems />) ;

        //We expect 2 <NavigationItem /> to be rendered when not authenticated
        expect( wrapper.find( NavigationItem ) ).toHaveLength(2);
    } )

    // it( 'should render 3 <NavigationIntem /> elements if  authenticated' , () => {
        
    //     //const wrapper = shallow(<NavigationItems isAuthenticated={true} />) ;
    //     //wrapper = shallow(<NavigationItems isAuthenticated={true} />);

    //     //We can also set props on wrapper
    //     wrapper.setProps( { isAuthenticated : true } )
        
    //     expect( wrapper.find( NavigationItem ) ).toHaveLength(3);
    // } )

    it( 'should render 3 <NavigationIntem /> elements if  authenticated' , () => {
        
        //const wrapper = shallow(<NavigationItems isAuthenticated={true} />) ;
        //wrapper = shallow(<NavigationItems isAuthenticated={true} />);

        //We can also set props on wrapper
        wrapper.setProps( { isAuthenticated : true } )
        
        expect( wrapper.contains( <NavigationItem link="/logout">Logout</NavigationItem> ) ).toEqual(true);
    } )

} )

//write npm test to run tests