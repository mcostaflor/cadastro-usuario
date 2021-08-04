import React from 'react';
import { Layout } from 'antd';
import { Breadcrumbs } from '../breadcrumb';
import './index.scss';

const { Content, Footer } = Layout;

export const PageLayout = ({ children, breadcrumbs }) => {
    return (
        <Layout className="page-layout">
            <div className="page-layout__breadcrumbs">
                <Breadcrumbs
                    items={breadcrumbs}
                />
            </div>
            <Content className="page-layout__content">
                {children}
            </Content>
            <Footer>
                mcostaflor (r) 2021
            </Footer>
        </Layout>
    )
}