import React, { useEffect, useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa'; // Added new icons
import { Line } from 'react-chartjs-2'; // Chart for graph representation
import 'chart.js/auto'; // Chart.js dependency
import axios from "axios";

const AccessToSocialMedia = ({ athleteId }) => {
  const [showAnalytics, setShowAnalytics] = useState(false);

  const [athleteDetails, setAthleteDetails] = useState({});

  const getData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/athletes/get-athlete-details-by-id", { athleteId: athleteId });
      setAthleteDetails(response?.data?.AccessToSocialMedia);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(athleteDetails)
  useEffect(() => {
    getData();
  }, []);

  const socialMediaAccounts = [
    {
      platform: 'Instagram',
      handle: `${athleteDetails?.InstagramID}`,
      profilePic: 'https://mediastreet.ie/wp-content/uploads/2017/08/blank-profile-picture.png.',
      followers: `${athleteDetails?.Followers}`,
      engagementRate: `${athleteDetails?.EngagementRate}`,
      posts: `${athleteDetails?.Posts}`,
      link: `https://instagram.com/${athleteDetails?.InstagramID?.replace('@', '')}`
    },
    {
      platform: 'Twitter',
      handle: `${athleteDetails?.TwitterID}`,
      profilePic: `https://mediastreet.ie/wp-content/uploads/2017/08/blank-profile-picture.png.`,
      followers: `${athleteDetails?.TwitterFollowers}`,
      engagementRate: `${athleteDetails?.TwitterEngagementRate}`,
      posts: `${athleteDetails?.TwitterPosts}`,
      link: `https://twitter.com/${athleteDetails?.TwitterID?.replace('@', '')}`
    },
    {
      platform: 'Facebook',
      handle: `${athleteDetails?.FacebookID}`,
      profilePic: `https://mediastreet.ie/wp-content/uploads/2017/08/blank-profile-picture.png.`,
      followers: `${athleteDetails?.FacebookFollowers}`,
      engagementRate: `${athleteDetails?.FacebookEngagementRate}`,
      posts: `${athleteDetails?.FacebookPosts}`,
      link: `https://facebook.com/${athleteDetails?.FacebookID}`
    },
    {
      platform: 'LinkedIn',
      handle: `${athleteDetails?.LinkedInID}`,
      profilePic: `https://mediastreet.ie/wp-content/uploads/2017/08/blank-profile-picture.png.`,
      followers: `${athleteDetails?.LinkedInFollowers}`,
      engagementRate: `${athleteDetails?.LinkedInEngagementRate}`,
      posts: `${athleteDetails?.LinkedInPosts}`,
      link: `https://linkedin.com/in/${athleteDetails?.LinkedInID?.replace('@', '')}`
    },
    {
      platform: 'YouTube',
      handle: `${athleteDetails?.YouTubeID}`,
      profilePic: `https://mediastreet.ie/wp-content/uploads/2017/08/blank-profile-picture.png.`,
      followers: `${athleteDetails?.YouTubeFollowers}`,
      engagementRate: `${athleteDetails?.YouTubeEngagementRate}`,
      posts: `${athleteDetails?.YouTubePosts}`,
      link: `https://youtube.com/c/${athleteDetails?.YouTubeID?.replace('@', '')}`
    }
  ];

  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Followers Growth',
        data: [1000, 2000, 2500, 3000, 3500],
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const handleAnalyticsClose = () => setShowAnalytics(false);
  const handleAnalyticsShow = () => setShowAnalytics(true);

  return (
    <div className="social-media-container" style={{ padding: '30px', backgroundColor: '#f8f9fa' }}>
      {/* Heading */}
      <h4
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '2.5rem',
          fontWeight: '600',
          color: '#333',
          textTransform: 'uppercase',
        }}
      >
        Access to Social Media
      </h4>

      {/* Social Media Accounts Display */}
      <div className="social-media-cards" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {socialMediaAccounts.map((account, index) => (
          <Card
            key={index}
            className="social-media-card"
            style={{
              width: '18rem',
              margin: '20px',
              transition: 'transform 0.3s ease-in-out',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
              overflow: 'hidden',
              cursor: 'pointer',
              backgroundColor: '#fff',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Card.Img
              variant="top"
              src={account.profilePic}
              style={{
                height: '150px',
                width: '150px',
                objectFit: 'cover',
                borderRadius: '50%',
                margin: '10px auto',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Card.Body>
              <Card.Title style={{ fontWeight: 'bold' }}>{account.platform}</Card.Title>
              <Card.Text>
                <strong>{account.handle}</strong>
                <br />
                Followers: {account.followers}
                <br />
                Posts: {account.posts}
                <br />
                Engagement Rate: {account.engagementRate}
              </Card.Text>
              <Button
                variant="primary"
                onClick={handleAnalyticsShow}
                style={{ width: '100%', marginBottom: '10px', backgroundColor: '#203c5c' }}
              >
                View Analytics
              </Button>
              <Button
                variant="secondary"
                href={account.link}
                target="_blank"
                style={{ width: '100%' }}
              >
                Visit Profile
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal for Analytics */}
      <Modal show={showAnalytics} onHide={handleAnalyticsClose}>
        <Modal.Header closeButton>
          <Modal.Title>Social Media Analytics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Engagement Metrics</h5>
            <p>Engagement Rate: 4.5%</p>
            <p>Post Interactions: 250 Likes, 50 Comments, 30 Shares</p>
            <div style={{ margin: '20px 0' }}>
              <h6>Followers Growth Over Time</h6>
              <Line data={engagementData} />
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Button
              variant="primary"
              onClick={handleAnalyticsClose}
              style={{ marginRight: '10px', backgroundColor: '#203c5c' }}
            >
              Download Report
            </Button>
            <Button variant="secondary" onClick={handleAnalyticsClose}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AccessToSocialMedia;