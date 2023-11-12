import Header from './header'
import { useSession } from '../../hooks/useSession';
import EmptyStates from './empty-states';

export default function Dashboard() {
    const { email } = useSession();
    return (
        <>
            <Header user_email={email} />
            <section id="dashboard" className="section section--hero">
                <EmptyStates/>
            </section>
            {/* <Footer /> */}
        </>
    )
}
