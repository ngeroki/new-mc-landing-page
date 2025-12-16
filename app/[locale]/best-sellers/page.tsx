import { redirect } from 'next/navigation';

export default function BestSellersPage() {
    // Redirect to catalog with bestseller filter
    redirect('/catalog?filter=bestseller');
}
