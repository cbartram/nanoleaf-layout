import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { mount, configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';
import NanoleafLayout from '../src/NanoleafLayout';

configure({ adapter: new Adapter() });

describe('<NanoleafLayout />', () => {
    it('Calls the render() method', () => {
        spy(NanoleafLayout.prototype, 'render');
        mount(<NanoleafLayout data={{ positionData: [] }} />);
        expect(NanoleafLayout.prototype.render).to.have.property('callCount', 1);
    });

    it('Calls the componentDidMount() method', () => {
        spy(NanoleafLayout.prototype, 'componentDidMount');
        mount(<NanoleafLayout data={{ positionData: [] }} />);
        expect(NanoleafLayout.prototype.componentDidMount).to.have.property('callCount', 1);
    });

    it('Renders the <NanoleafLayout /> component', () => {
        const wrapper = render(<NanoleafLayout data={{ positionData: [] }} />);
        expect(wrapper['0'].name).to.contain('svg');
    });

    it('Throws an Error when the data prop is missing', () => {
        try {
            render(<NanoleafLayout data={null}/>);
        } catch(err) {
            expect(err.message).to.be.a('string').that.equals('Cannot read property \'positionData\' of null');
        }
    });
});
