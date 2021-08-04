import React from 'react';
import { PageLayout } from '../../components/page-layout';

export const HomePage = () => {
    return (
        <PageLayout
            breadcrumbs={[
                {
                    route: '/',
                    text: 'Home'
                },
            ]}
        >
            Home
        </PageLayout>
    )
}
