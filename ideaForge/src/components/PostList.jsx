import React, { useEffect, useState, useRef, useCallback } from "react";
import { ThumbsUp, ThumbsDown, MessageCircle, Flag } from "lucide-react";
import "./PostList.css";

export default function PostList({ domain }) {
  const [posts, setPosts] = useState([]);
  const [expandedDesc, setExpandedDesc] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);
  const [commentBoxVisible, setCommentBoxVisible] = useState({});
  const [reportReason, setReportReason] = useState("");
  const [likeStatus, setLikeStatus] = useState({});
  const [dislikeStatus, setDislikeStatus] = useState({});
  const [likeCount, setLikeCount] = useState({});
  const [dislikeCount, setDislikeCount] = useState({});
  const [comments, setComments] = useState({});
  const containerRef = useRef();
  const videoRefs = useRef({});

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (!domain || ["Create Post", "Profile"].includes(domain)) {
      setPosts([]);
      return;
    }

    const fetchPosts = async () => {
      try {
        const url =
          domain === "Home"
            ? "http://localhost:8080/media/all"
            : `http://localhost:8080/media/by-domain?fileDomain=${domain}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        setPosts(data);

        const initialLikes = {};
        const initialDislikes = {};
        const initialLikeCount = {};
        const initialDislikeCount = {};
        const initialComments = {};

        data.forEach((post) => {
          initialLikes[post.id] = false;
          initialDislikes[post.id] = false;
          initialLikeCount[post.id] = post.likes || 0;
          initialDislikeCount[post.id] = post.dislikes || 0;
          initialComments[post.id] = post.comments || [];
        });

        setLikeStatus(initialLikes);
        setDislikeStatus(initialDislikes);
        setLikeCount(initialLikeCount);
        setDislikeCount(initialDislikeCount);
        setComments(initialComments);

        if (containerRef.current) {
          containerRef.current.scrollTo({ top: 0, behavior: "auto" });
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [domain]);

  const toggleSeeMore = (id) => {
    setExpandedDesc((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReport = (postId) => {
    setSelectedReport(postId);
  };

  const handleSubmitReport = (postId) => {
    if (reportReason.trim()) {
      console.log(`Reported Post ${postId} with reason: ${reportReason}`);
      setSelectedReport(null);
    }
  };

  const toggleCommentBox = (postId) => {
    setCommentBoxVisible((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleLike = (postId) => {
    setLikeStatus((prev) => {
      const wasLiked = prev[postId];
      const wasDisliked = dislikeStatus[postId];

      setLikeCount((count) => ({
        ...count,
        [postId]: count[postId] + (wasLiked ? -1 : 1),
      }));

      if (wasDisliked) {
        setDislikeStatus((d) => ({ ...d, [postId]: false }));
        setDislikeCount((dCount) => ({
          ...dCount,
          [postId]: dCount[postId] - 1,
        }));
      }

      return { ...prev, [postId]: !wasLiked };
    });
  };

  const handleDislike = (postId) => {
    setDislikeStatus((prev) => {
      const wasDisliked = prev[postId];
      const wasLiked = likeStatus[postId];

      setDislikeCount((count) => ({
        ...count,
        [postId]: count[postId] + (wasDisliked ? -1 : 1),
      }));

      if (wasLiked) {
        setLikeStatus((l) => ({ ...l, [postId]: false }));
        setLikeCount((lCount) => ({
          ...lCount,
          [postId]: lCount[postId] - 1,
        }));
      }

      return { ...prev, [postId]: !wasDisliked };
    });
  };

  const closeModal = (modalType, postId) => {
    if (modalType === "report") {
      setSelectedReport(null);
    } else if (modalType === "comment") {
      setCommentBoxVisible((prev) => ({
        ...prev,
        [postId]: false,
      }));
    }
  };

  const observerCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      const video = videoRefs.current[entry.target.dataset.postid];
      if (video) {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.6,
    });

    Object.values(videoRefs.current).forEach((videoEl) => {
      if (videoEl) observer.observe(videoEl);
    });

    return () => {
      observer.disconnect();
    };
  }, [posts, observerCallback]);

  const submitComment = async (postId, text) => {
    if (!text.trim()) return;
    try {
      const response = await fetch(
        `http://localhost:8080/media/${postId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ commenter: currentUser, text }),
        }
      );
      const newComment = await response.json();
      setComments((prev) => ({
        ...prev,
        [postId]: [...prev[postId], newComment],
      }));
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="post-list-wrapper" ref={containerRef}>
      <div className="post-list">
        {posts.length === 0 ? (
          <p className="info-text">No posts found for "{domain}".</p>
        ) : (
          posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post-header">
                <p className="posted-by">Posted by: {currentUser}</p>
              </div>

              {post.fileType && post.fileType.startsWith("image") ? (
                <img
                  src={`data:${post.fileType};base64,${post.base64Data}`}
                  alt="media"
                  className="media"
                />
              ) : post.fileType && post.fileType.startsWith("video") ? (
                <video
                  controls
                  className="media"
                  ref={(el) => (videoRefs.current[post.id] = el)}
                  data-postid={post.id}
                >
                  <source
                    src={`data:${post.fileType};base64,${post.base64Data}`}
                    type={post.fileType}
                  />
                </video>
              ) : (
                <p>Unsupported media type</p>
              )}

              <div className="media-footer">
                <div className="icon-buttons">
                  <ThumbsUp
                    size={20}
                    className="icon"
                    title="Like"
                    onClick={() => handleLike(post.id)}
                    style={{
                      color: likeStatus[post.id] ? "#0caa11" : "#faf9fd",
                    }}
                  />
                  <span className="count">{likeCount[post.id]}</span>
                  <ThumbsDown
                    size={20}
                    className="icon"
                    title="Dislike"
                    onClick={() => handleDislike(post.id)}
                    style={{
                      color: dislikeStatus[post.id] ? "#c44" : "#faf9fd",
                    }}
                  />
                  <span className="count">{dislikeCount[post.id]}</span>
                  <MessageCircle
                    size={20}
                    className="icon"
                    title="Comment"
                    onClick={() => toggleCommentBox(post.id)}
                  />
                  <Flag
                    size={20}
                    className="icon"
                    title="Report"
                    onClick={() => handleReport(post.id)}
                  />
                </div>

                <div className="desc">
                  {post.description.length > 80 && !expandedDesc[post.id] ? (
                    <>
                      {post.description.slice(0, 80)}...
                      <span
                        className="see-more"
                        onClick={() => toggleSeeMore(post.id)}
                      >
                        {" "}
                        See more
                      </span>
                    </>
                  ) : (
                    <>
                      {post.description}
                      {post.description.length > 80 && (
                        <span
                          className="see-more"
                          onClick={() => toggleSeeMore(post.id)}
                        >
                          {" "}
                          Show less
                        </span>
                      )}
                    </>
                  )}
                </div>

                <div className="comments">
                  {comments[post.id]?.map((c, i) => (
                    <div className="comment" key={i}>
                      <strong>{c.user}:</strong> {c.text}
                    </div>
                  ))}
                </div>

                {selectedReport === post.id && (
                  <div className="modal report-modal">
                    <div className="report-box">
                      <select
                        onChange={(e) => setReportReason(e.target.value)}
                        value={reportReason}
                      >
                        <option value="">Select a reason</option>
                        <option value="Inappropriate Content">
                          Inappropriate Content
                        </option>
                        <option value="Spam">Spam</option>
                        <option value="Harassment">Harassment</option>
                        <option value="Other">Other</option>
                      </select>
                      <button onClick={() => handleSubmitReport(post.id)}>
                        Submit Report
                      </button>
                      <button
                        className="close-button"
                        onClick={() => closeModal("report", post.id)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                {commentBoxVisible[post.id] && (
                  <div className="modal comment-modal">
                    <div className="comment-box">
                      <textarea
                        placeholder="Write your comment..."
                        rows="3"
                        onBlur={(e) => submitComment(post.id, e.target.value)}
                      />
                      <button
                        onClick={(e) =>
                          submitComment(post.id, e.target.previousSibling.value)
                        }
                      >
                        Submit Comment
                      </button>
                      <button
                        className="close-button"
                        onClick={() => closeModal("comment", post.id)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
