import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';
import NanoleafLayout from '../src/NanoleafLayout';

configure({ adapter: new Adapter() });
spy(NanoleafLayout.prototype, 'render');

describe('<NanoleafLayout />', () => {
    it('Calls the render() method', () => {
        const wrapper = mount(<NanoleafLayout data={{ positionData: [] }} />);
        expect(NanoleafLayout.prototype.render).to.have.property('callCount', 1);
    });
});
