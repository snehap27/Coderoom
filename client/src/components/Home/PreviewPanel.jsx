function PreviewPanel() {

    const features=[
        "Code Editor",
        "Whiteboard",
        "Interview Timer",
        "Cursor Tracking",
        "Multi-user Room"
    ];

    return(

        <div className="preview-card">

            <h2>Workspace Status</h2>

            {

                features.map((feature,index)=>(

                    <div
                        key={index}
                        className="status-card"
                    >

                        <span className="status-dot"></span>

                        <span>{feature}</span>

                        <span className="status-online">
                            Online
                        </span>

                    </div>

                ))

            }

        </div>

    );

}

export default PreviewPanel;