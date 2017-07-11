/**
 * Created by Christian Bartram on 7/10/17.
 * Github @cbartram
 */
import React from 'react';
import renderer from 'react-test-renderer'
import Link from '../src/Link';



test('onClick and onHover execute callbacks', () => {
   const component = renderer.create(<Link page="http://www.facebook.com">Facebook</Link>);

    let tree = component.toJSON();

   expect(tree).toMatchSnapshot();


   tree.props.onClick();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.onHover();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});