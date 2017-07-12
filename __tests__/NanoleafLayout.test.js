/**
 * Created by g6vc on 7/12/17.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import NanoleafLayout from '../src/components/NanoleafLayout';

test('component matches snapshot', () => {
    const component = renderer.create(
        <NanoleafLayout data={{positionData: []}} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});