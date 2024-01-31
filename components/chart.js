import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1, 2, 3, 4, 5]
        };
    }

    componentDidMount() {
        const svgElement = d3.select(this.refs.svg);

        svgElement.append("circle")
            .attr("cx", 150)
            .attr("cy", 70)
            .attr("r", 50);
    }

    render() {
        return (
            <svg width={460} height={400} id="barchart" ref="svg" />
        );
    }
}

export default BarChart;