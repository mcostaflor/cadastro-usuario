import React from 'react';
import { Layout } from 'antd';
import './index.scss';

const { Content, Footer } = Layout;

export const PageLayout = ({ children }) => {
    return (
        <Layout className="page-layout">
            <Content className="page-layout__content">
                {children}
            </Content>
            <Footer className="page-layout__footer">
                mcostaflor (r) 2021
            </Footer>
        </Layout>
    )
}