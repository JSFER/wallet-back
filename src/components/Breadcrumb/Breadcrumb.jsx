
import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const breadcrumbNameMap = {
    '/': '首页',
    '/product': '产品管理',
    '/product/add': '产品录入',
    '/product/group': '分类管理',
    '/page': '页面管理',

};
export default class BreadcrumbCustom extends Component {
    static contextTypes = {
        router: PropTypes.object,
    }
    constructor(props, context) {
        super(props, context)
        this.state = {
            pathSnippets: null,
            extraBreadcrumbItems: null,
        }
    }
    componentWillMount() {
        this.getPath();
    }
    componentWillReceiveProps() {
        this.getPath();
    }
    getPath() {
        this.state.pathSnippets = this.context.router.history.location.pathname.split('/').filter(i => i);
        this.state.extraBreadcrumbItems = this.state.pathSnippets.map((_, index) => {
            const url = `/${this.state.pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
    }
    render() {
        return (
            <span>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    {this.state.extraBreadcrumbItems}
                </Breadcrumb>
            </span>
        )
    }
}
