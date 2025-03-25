import {lazy, Suspense, useMemo} from 'react'
import useAuth from '~/hooks/useAuth'
import {Spin} from "antd";
import CenterLoader from "~/components/CenterLoader";

const LAYOUT_DEFAULT = 'LAYOUT_DEFAULT';
const layouts = {
    [LAYOUT_DEFAULT]: lazy(() => import('./DefaultLayout')),
}

const Layout = () => {
    const { authenticated } = useAuth()

    // useDirection()
    //
    // useLocale()

    const AppLayout = useMemo(() => {
        if (authenticated) {
            return layouts[LAYOUT_DEFAULT]
        }
        return lazy(() => import('./AuthLayout'))
    }, [authenticated])

    return (
        <Suspense
            fallback={<CenterLoader />}
        >
            <AppLayout />
        </Suspense>
    )
}

export default Layout
