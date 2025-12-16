import { redirect } from 'next/navigation';

export default function NewArrivalsPage() {
    // Redirect to catalog with new filter
    redirect('/catalog?filter=new');
}
