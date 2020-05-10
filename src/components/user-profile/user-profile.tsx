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
                    <div style={{ textAlign: 'center', marginTop: '24px', marginBottom: '24px' }}>
                        <Space size={"large"}>
                            <Button type="primary" onClick={editProfile}>Edit Profile</Button>
                            <Button type="primary">Change Status</Button>
                        </Space>
                    </div>
                    <div style={{marginLeft: '28px' }}>
                        <div className="roles">
                            <h3>Role</h3>
                            <p>{profile.roles}</p>
                        </div>
                        <div className="email">
                            <h3>Email</h3>
                            <p>{profile.email}</p>
                        </div>
                        <div className="phone">
                            <h3>Phone</h3>
                            <p>{profile.phone}</p>
                        </div>
                        <div className="bio">
                            <h3>Bio</h3>
                            <p>{profile.bio}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}