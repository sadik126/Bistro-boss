import React, { useContext } from 'react';
import { AuthContext } from '../Authprovider/Authprovider';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';
import { useQuery } from '@tanstack/react-query';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';

const Paymenthistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = Useaxiossecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            console.log(res.data)
            return res.data;
        }
    })
    return (
        <div>
            {/* <Sectiontitle title={'PAYMENT HISTORY'} subtitle={'---At a Glance!---'}></Sectiontitle> */}
            <h2 className='text-3xl'>Total payments : {payments.length}</h2>
            <div className="overflow-x-auto h-screen p-5">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead className='bg-orange-400'>
                        <tr>
                            <th>Sl</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(payments)}

                        {
                            payments.sort((a, b) => new Date(b.date) - new Date(a.date)).map((p, index) =>
                                <tr key={p._id}>
                                    <th>{index + 1}</th>
                                    <td>{p.price}</td>
                                    <td>{p.transationId}</td>
                                    <td> <button className={p.status === 'pending' ? `btn bg-yellow-400` : `btn bg-green-400`}>{p.status}</button></td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Paymenthistory;