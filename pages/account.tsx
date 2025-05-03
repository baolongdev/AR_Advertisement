import { useSession } from '../hooks/useSession'
import Account from '../components/account/account';
import Dashboard from '../components/dashboard/dashboard';

export default function LoginPage() {
    const { session } = useSession();

    if (!session) {
        return (
            <Account />
        )
    }
    else {
        return (
            <Dashboard />
        );
    }
}