import React from 'react';
import { Layout } from 'antd';
import { Breadcrumbs } from '../breadcrumb';
import { BrowserView } from 'react-device-detect';
import './index.scss';

const { Content, Footer } = Layout;

export const PageLayout = ({ children, breadcrumbs }) => {
    return (
        <Layout className="page-layout">
            <BrowserView>
                <div className="page-layout__breadcrumbs">
                    <Breadcrumbs
                        items={breadcrumbs}
                    />
                </div>
            </BrowserView>
            <Content className="page-layout__content">
                {children}
            </Content>
            <Footer className="page-layout__footer">
                mcostaflor (r) 2021
            </Footer>
        </Layout>
    )
}