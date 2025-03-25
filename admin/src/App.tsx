import React from "react";
import {
    Routes,
    Route, HashRouter as Router,
} from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import {message} from "antd";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "~/store";
import Layout from '~/layouts/Layouts'
import {ConfigProvider} from "antd";
// import { setConfig } from "bitpixel-antd-utils";
import { SERVER_URL } from "./configs";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5*(60*1000), // 5 mins
            cacheTime: 10*(60*1000), // 10 mins
        },
    },
});


// export const getUrlForModel = (model: string, id: any = null) => {
//     if (id) {
//       return `crud/${id}?model=${model}`;
//     }
//     return `crud?model=${model}`;
//   };
  
// setConfig({
//     baseUrl: `${SERVER_URL}/api/v1`,
//     urlPattern: 'crud/?model={model}',
//     urlPatternWithId: 'crud/{id}?model={model}',
// })

function App() {
    const [msg, contextHolder] = message.useMessage();

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router >
                        <QueryClientProvider client={queryClient}  contextSharing={true}>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        fontFamily: "Inter, sans-serif",
                                    }
                                }}
                            >
                            <Layout />
                            </ConfigProvider>
                        </QueryClientProvider>
                    </Router >
                </PersistGate>
            </Provider>
        )
    /*return (
        <div >
            {contextHolder}
            <Routes>
                <Route path='*' element={<DefaultLayout/>}/>

                {/!*<Route path="/" element={<Home />} />*!/}
            </Routes>
        </div>
    );*/
}

export default App;
