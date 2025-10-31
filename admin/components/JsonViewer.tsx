'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

const JsonViewer = dynamic(() => import('@microlink/react-json-view'), { ssr: false })

function getExampleJson1() {
    return {
        string: "this is a test string",
        integer: 42,
        empty_array: [],
        empty_object: {},
        array: [1, 2, 3, "test"],
        float: -2.757,
        undefined_var: undefined,
        parent: {
            sibling1: true,
            sibling2: false,
            sibling3: null
        },
        string_number: "1234",
        date: new Date().toISOString()
    }
}

export default function JsonEditorExamples() {
    const [enableAdd, setEnableAdd] = useState(true)
    const [enableDelete, setEnableDelete] = useState(true)
    return (
        <div>
            <div className="flex items-center gap-6 mb-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={enableAdd}
                        onChange={e => setEnableAdd(e.target.checked)}
                    />
                    Enable Add
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={enableDelete}
                        onChange={e => setEnableDelete(e.target.checked)}
                    />
                    Enable Delete
                </label>
            </div>
            <JsonViewer
                src={getExampleJson1()}
                theme="rjv-default"
                iconStyle="triangle"
                displayDataTypes={false}
                displayObjectSize={true}
                indentWidth={4}
                collapsed={false}
                collapseStringsAfterLength={20}
                enableClipboard={true}
                onEdit={e => { console.log("edit", e) }}
                onAdd={enableAdd ? (e => { console.log("add", e) }) : undefined}
                onDelete={enableDelete ? (e => { console.log("delete", e) }) : undefined}
            />
        </div>
    )
}