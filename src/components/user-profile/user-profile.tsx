import { Avatar, Button, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchData } from '../../datasource/fetchData';
import { Profile } from '../../models/profile';
import './user-profile.css';

const defaultAvatar = 'https://media.ngoisao.vn/resize_580/news/2018/11/26/hotgirl-1-ngoisao.vn-w600-h493.jpg';

export function UserProfile() {

    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData('http://localhost:3000/profile');
                setProfile(data);
            } catch (e) {
                console.log(e);
            }

        })();
    }, []);

    const history = useHistory();

    function editProfile() {
        history.push('/edit-profile');
    };

    return (
        <>
            {profile &&
                <div>
                    <div className="user-avatar">
                        <Avatar src={profile.avatar ? profile.avatar : defaultAvatar} style={{ width: '100px', height: '100px' }} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3>{profile.name}</h3>
                        <h5>{profile.title}</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Space size={"middle"}>
                            <Button type="primary" onClick={editProfile}>Edit Profile</Button>
                            <Button type="primary">Change Status</Button>
                        </Space>
                    </div>
                    <div>
                        <div className="roles">
                            <h4>Role</h4>
                            {/* <p>{profile.roles.join()}</p> */}
                            <p>{profile.roles}</p>
                        </div>
                        <div className="email">
                            <h4>Email</h4>
                            <p>{profile.email}</p>
                        </div>
                        <div className="phone">
                            <h4>Phone</h4>
                            <p>{profile.phone}</p>
                        </div>
                        <div className="bio">
                            <h4>Bio</h4>
                            <p>{profile.bio}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}