/* eslint-disable jsx-a11y/aria-role */
import React, { useState } from "react";

function App() {

    const [agenda, setAgenda] = useState([
        {
            title: "Angular",
            description: "Some description about the angular",
            topics: ["Introduction", "Typescript", "Why Angular?", "Understanding Versions", "Fundamentals"]
        },
        {
            title: "Vue",
            description: "Some description about the vue",
            topics: ["Introduction", "Javascript", "Why Vue?", "Vue Bindings", "Component Interaction"]
        },
    ]);

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newTopic, setNewTopic] = useState("");
    const [topics, setTopics] = useState([]);

    // your data goes here (state)
    const [showAddAgenda, setShowAgenda] = useState(true)
    // your methods goes here
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        topic: "",
    });

    const validateTitle = (title) => (title.trim() === "" ? "Title is required" : "");
    const validateDescription = (description) => (description.trim() === "" ? "Description is required" : "");
    const validateTopic = (topic) => (topic.trim() === "" ? "Topic is required" : "");

    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
        setErrors({ ...errors, title: validateTitle(e.target.value) });
    };

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value);
        setErrors({ ...errors, description: validateDescription(e.target.value) });
    };

    const handleTopicChange = (e) => {
        setNewTopic(e.target.value)
        setErrors({ ...errors, topic: validateTopic(e.target.value) })
    }

    const addTopic = () => {
        if (validateTopic(newTopic) === "") {
            setTopics([...topics, newTopic.trim()]);
            setNewTopic("");
        }
    };

    const submitAgenda = () => {
        if (validateTitle(newTitle) === "" && validateDescription(newDescription) === "" && topics.length > 0) {
            setAgenda([...agenda, { title: newTitle.trim(), description: newDescription.trim(), topics }]);
            setNewTitle("");
            setNewDescription("");
            setTopics([]);
        }
    };

    return (
        <div>
            <h1 className="mx-5 mb-5">Agenda Manager</h1>
            {/* show/hide this following add agenda template */}
            {showAddAgenda && (
                <div className="container" role="addAgenda">
                    <button className="btn btn-info" role="goToView" onClick={() => setShowAgenda(false)}>
                        Click To View Agenda
                    </button>
                    <form>
                        <div className="my-3">
                            <label className="form-label">Title</label>
                            {/* title */}
                            <input
                                type="text"
                                name="newTitle"
                                placeholder="Enter the title"
                                className="form-control"
                                role="inputTitle"
                                value={newTitle}
                                onChange={handleTitleChange}
                            />

                            <small className="text-danger" data-testid="invalidTitle">
                                {errors.title}
                            </small>
                        </div>
                        <div className="my-3">
                            <label className="form-label">Description</label>
                            {/* description */}
                            <input
                                type="text"
                                name="newDescription"
                                placeholder="Enter the description"
                                className="form-control"
                                role="inputDescription"
                                value={newDescription}
                                onChange={handleDescriptionChange}
                            />

                            <small className="text-danger" data-testid="invalidDescription">
                                {errors.description}
                            </small>
                        </div>
                        <div className="my-3 w-50">
                            <label className="form-label">Enter topic</label>
                            {/* topic */}
                            <input
                                type="text"
                                name="newTopic"
                                placeholder="Enter the topic"
                                className="form-control"
                                role="inputTopic"
                                value={newTopic}
                                onChange={handleTopicChange}
                            />

                            <small className="text-danger" data-testid="invalidTopic">
                                {errors.topic}
                            </small>
                        </div>
                        {/* on click should add topics and disable the button if invalid topic */}
                        <button className="btn btn-success addAlign" role="addTopicBtn" onClick={addTopic} disabled={validateTopic(newTopic) !== ""} >
                            + Add Topic
                        </button>
                        {/* on click should add agenda details and disable the button if invalid inputs */}
                        <button
                            className="btn btn-success submitAlign"
                            role="submitAgendaBtn"
                            onClick={submitAgenda}
                            disabled={validateTitle(newTitle) !== "" || validateDescription(newDescription) !== "" || topics.length === 0 }
                        >
                            Submit Agenda
                        </button>
                    </form>
                    {topics.length === 0 && ( 
                    <div className="text-danger ml-2 mt-5" data-testid="noTopicsMsg">
                        No Topics  Added
                    </div>
                    )}
                    {topics.length > 0 && ( 
                    <div className="card my-3">
                        <div className="card-header">Added Topics</div>
                        <div className="card-body">
                            <ul className="list-group">
                                {topics.map((topic, index) => ( 
                                <li className="list-group-item" role="topicList" key={index}>{topic}
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card-footer">Refer the topics you added</div>
                    </div>
                    )}
                </div>
            )}
            {!showAddAgenda && ( 
            <div className="container" role="viewAgenda">
                <button className="btn btn-info" role="goToAdd" onClick={() => setShowAgenda(true)}>
                    Click To Add Agenda
                </button>
                {agenda.map((item, index) => ( 
                <div className="card my-3" role="cards">
                    <div className="card-header">{item.title}</div>
                    <div className="card-body">
                        <ul className="list-group">
                            {item.topics.map((topic, idx) =>
                            <li className="list-group-item" key={idx}>
                                {topic}
                            </li>
                            )}
                        </ul>
                    </div>
                    <div className="card-footer">{item.description}</div>
                </div>
                ))}
            </div>
)}
        </div>
    );
}

export default App;

