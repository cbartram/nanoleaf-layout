/**
 * Created by christianbartram on 7/21/17.
 */
import React, {Component} from 'react';
import _ from 'lodash';
import NanoleafLayout from "../../../src/index";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'

import {Link} from 'react-router-dom';
import Highlight from 'react-highlight';


let data = {
    numPanels: 6,
    sideLength: 150,
    positionData: [
        {
            panelId: 1,
            x: 100,
            y: 100,
            o: 0,
            selected: true,
            strokeColor: '#FFFFFF',
        },
        {
            panelId: 200,
            x: 25,
            y: -29,
            o: 240,
            selected: true,
            strokeColor: '#FFFFFF',
        },
        {
            panelId: 30,
            x: 174,
            y: -29,
            o: 120,
            selected: true,
            strokeColor: '#FFFFFF',
        },
        {
            panelId: 4,
            x: 99,
            y: 13,
            o: 180,
            selected: true,
            strokeColor: '#FFFFFF',
        },
        {
            panelId: 50,
            x: 99,
            y: -159,
            o: 0,
            selected: true,
            strokeColor: '#FFFFFF',
        },
        {
            panelId: 600,
            x: 25,
            y: -116,
            o: 60,
            selected: true,
            strokeColor: '#FFFFFF',
        }
    ]
};

export default class CallbackExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            strokeColor: '#FFFFFF',
            hoverTile: null,
        }
    }

    /**
     * Handles a Panel being clicked
     * @param panel
     */
    handleClick = (panel) => {
        //Use lodash to map the index of the positionData array to the panel we clicked
       let index = _.findIndex(data.positionData, (o) => {
            return o.panelId === panel.id;
        });

        let obj = data.positionData[index];

        obj.selected ? obj.strokeColor = '#00FF00': obj.strokeColor = '#FFFFFF';

        obj.selected = !obj.selected;

        //Just to trigger a DOM Re-render
        this.setState({})
    };


    /**
     * Handles a panel being hovered over
     */
    handleHover = (panel) => {
        this.setState({hoverTile: panel.id})
    };

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Nanoleaf Layout" iconElementRight={<FlatButton label={<Link to="/">Home</Link>} />} />
                    <div className="row">
                        <div className="col-md-6">
                            <h3 style={{marginLeft:200}}>Try Clicking on the Nanoleaf Tiles to select and deselect them!</h3>

                            <h4 style={{marginLeft: 400}}>You hovered over the panel with the id of {this.state.hoverTile}</h4>

                            <NanoleafLayout
                                data={data}
                                onClick={(data) => this.handleClick(data)}
                                onHover={(data) => this.handleHover(data)}
                                strokeWidth={4}
                                showId
                            />
                        </div>
                        <div className="col-md-6">
                            <Highlight className='javascript'>
                                {`
    import React, {Component} from 'react';
    import NanoleafLayout from "../../../src/index";

    let data = {
    numPanels: 6,
    sideLength: 150,
    positionData: [
        {
            panelId: 1,
            x: 100,
            y: 100,
            o: 0,
            selected: true,
            strokeColor: '#FFFFFF',
        },
        {
            panelId: 200,
            x: 25,
            y: -29,
            o: 240,
            selected: true,
            strokeColor: '#FFFFFF',
        },
        {
            panelId: 30,
            x: 174,
            y: -29,
            o: 120,
            selected: true,
            strokeColor: '#FFFFFF',
        },
        {
            panelId: 4,
            x: 99,
            y: 13,
            o: 180,
            selected: true,
            strokeColor: '#FFFFFF',
        },
        {
            panelId: 50,
            x: 99,
            y: -159,
            o: 0,
            selected: true,
            strokeColor: '#FFFFFF',
        },
        {
            panelId: 600,
            x: 25,
            y: -116,
            o: 60,
            selected: true,
            strokeColor: '#FFFFFF',
        }
    ]
};

export default class CallbackExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            strokeColor: '#FFFFFF',
            hoverTile: null,
        }
    }

    /**
     * Handles a Panel being clicked
     * @param panel
     */
    handleClick = (panel) => {
        //Use lodash to map the index of the positionData array to the panel we clicked
       let index = _.findIndex(data.positionData, (o) => {
            return o.panelId === panel.id;
        });

        let obj = data.positionData[index];

        obj.selected ? obj.strokeColor = '#00FF00': obj.strokeColor = '#FFFFFF';

        obj.selected = !obj.selected;

        //Just to trigger a DOM Re-render
        this.setState({})

    };

    /**
     * Handles a panel being hovered over
     */
    handleHover = (panel) => {
        this.setState({hoverTile: panel.id})
    };


        render() {
            return (
            <div>

            <h3>Try Clicking on the Nanoleaf Tiles to select and deselect them!</h3>

            <h4>You hovered over the panel with the id of {this.state.hoverTile}</h4>

                <NanoleafLayout
                    data={data}
                    onClick={(data) => this.handleClick(data)}
                    onHover={(data) => this.handleHover(data)}
                    strokeWidth={4}
                    showId
                 />
            </div>
            );
        }
    }
                               `}
                            </Highlight>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>

        );
    }
}