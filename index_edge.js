/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
            js+"jquery-2.0.3.min.js",
            js+"TweenMax.min.js",
            js+"Draggable.min.js",
            js+"jquery-transformer.js"
        ],
        symbols = {
            "stage": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "both",
                centerStage: "both",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'container',
                            type: 'rect',
                            rect: ['18', '18', '953', '559', 'auto', 'auto'],
                            borderRadius: ["25px 25px", "25px 25px", "25px 25px", "25px 25px"],
                            fill: ["rgba(199,222,241,0.00)"],
                            stroke: [0,"rgb(0, 152, 255)","none"]
                        },
                        {
                            id: 'Text',
                            type: 'text',
                            rect: ['30', '28px', '930', '28', 'auto', 'auto'],
                            text: "Összekeveredtek a puzzle képei.",
                            align: "center",
                            font: ['Tahoma, Geneva, sans-serif', [24, "px"], "rgba(0,0,0,1)", "700", "none", "", "break-word", ""]
                        },
                        {
                            id: 'TextCopy',
                            type: 'text',
                            rect: ['30', '56px', '930', '16', 'auto', 'auto'],
                            text: "<p style=\"margin:0px\">Ha a helyükre húzod őket, egy az őszre jellemző képet kapsz.​</p>",
                            align: "center",
                            font: ['Tahoma, Geneva, sans-serif', [14, "px"], "rgba(0,0,0,1)", "400", "none", "", "break-word", ""]
                        },
                        {
                            id: 'draggables',
                            symbolName: 'draggables',
                            type: 'rect',
                            rect: ['0px', '10px', '1000', '600', 'auto', 'auto'],
                            transform: [[],[],[],['0.76','0.76']]
                        },
                        {
                            id: 'solution',
                            type: 'image',
                            rect: ['0px', '10px', '1000px', '600px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"spritesheet.png",'0px','0px','1000px','1000px', 'no-repeat'],
                            userClass: "draggables",
                            transform: [[],[],[],['0.76','0.76']]
                        },
                        {
                            id: 'comp_evaluator',
                            symbolName: 'comp_evaluator',
                            type: 'rect',
                            rect: ['0px', '0px', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'counter',
                            symbolName: 'counter',
                            type: 'rect',
                            rect: ['452px', '263px', 'undefined', 'undefined', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '1000', '600', 'auto', 'auto'],
                            sizeRange: ['320px','1000px','',''],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "draggables": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'image',
                            id: 'draggable_1',
                            rect: ['0px', '0px', '250px', '300px', 'auto', 'auto'],
                            userClass: 'draggables',
                            fill: ['rgba(0,0,0,0)', 'images/spritesheet.png', '0px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            type: 'image',
                            id: 'draggable_2',
                            rect: ['250px', '0px', '250px', '300px', 'auto', 'auto'],
                            userClass: 'draggables',
                            fill: ['rgba(0,0,0,0)', 'images/spritesheet.png', '-250px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            type: 'image',
                            id: 'draggable_3',
                            rect: ['500px', '0px', '250px', '300px', 'auto', 'auto'],
                            userClass: 'draggables',
                            fill: ['rgba(0,0,0,0)', 'images/spritesheet.png', '-500px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            type: 'image',
                            id: 'draggable_4',
                            rect: ['750px', '0px', '250px', '300px', 'auto', 'auto'],
                            userClass: 'draggables',
                            fill: ['rgba(0,0,0,0)', 'images/spritesheet.png', '-750px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            type: 'image',
                            id: 'draggable_5',
                            rect: ['0px', '300px', '250px', '300px', 'auto', 'auto'],
                            userClass: 'draggables',
                            fill: ['rgba(0,0,0,0)', 'images/spritesheet.png', '0px', '-300px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            type: 'image',
                            id: 'draggable_6',
                            rect: ['250px', '300px', '250px', '300px', 'auto', 'auto'],
                            userClass: 'draggables',
                            fill: ['rgba(0,0,0,0)', 'images/spritesheet.png', '-250px', '-300px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            type: 'image',
                            id: 'draggable_7',
                            rect: ['500px', '300px', '250px', '300px', 'auto', 'auto'],
                            userClass: 'draggables',
                            fill: ['rgba(0,0,0,0)', 'images/spritesheet.png', '-500px', '-300px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            type: 'image',
                            id: 'draggable_8',
                            rect: ['750px', '300px', '250px', '300px', 'auto', 'auto'],
                            userClass: 'draggables',
                            fill: ['rgba(0,0,0,0)', 'images/spritesheet.png', '-750px', '-300px', '1000px', '1000px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '1000px', '600px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "btn_answer": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '80px', '35px', 'auto', 'auto'],
                            borderRadius: ['20px', '20px', '20px', '20px 20px'],
                            id: 'bg',
                            stroke: [2, 'rgba(79,136,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.99)']
                        },
                        {
                            rect: ['29px', '5px', '30px', '29px', 'auto', 'auto'],
                            id: 'image',
                            type: 'image',
                            display: 'block',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet.png', '-300px', '-99px', '1000px', '1000px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '84px', '39px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "modal": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '450px', '300px', 'auto', 'auto'],
                            borderRadius: ['5px', '5px', '5px', '5px 5px'],
                            boxShadow: ['', 0, 13, 60, 0, 'rgba(0,0,0,0.65098)'],
                            id: 'bg',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.98)']
                        },
                        {
                            rect: ['177px', '165px', '96px', '98px', 'auto', 'auto'],
                            id: 'happy',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet.png', '0px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            rect: ['177px', '165px', '96px', '98px', 'auto', 'auto'],
                            id: 'sad',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet.png', '-100px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            rect: ['177px', '165px', '96px', '98px', 'auto', 'auto'],
                            id: 'neutral',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet.png', '-200px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            type: 'text',
                            rect: ['29px', '56px', '392px', '94px', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">​Lorem ipsum dolor sit amet, consectetur elit. In quis nulla ac mi ultrices non eget lectus.<span style=\"font-size: 18px;\"></span></p>',
                            id: 'text',
                            textStyle: ['', '', '30px', '', 'none'],
                            align: 'center',
                            font: ['Tahoma, Geneva, sans-serif', [24, 'px'], 'rgba(170,170,170,1.00)', '400', 'none', 'normal', 'break-word', 'normal']
                        },
                        {
                            rect: ['0px', '39px', '450px', '1px', 'auto', 'auto'],
                            id: 'divider',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(225,225,225,1.00)']
                        },
                        {
                            type: 'rect',
                            id: 'btn_close',
                            symbolName: 'btn_close',
                            rect: ['423px', '12px', '14', '14', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '450px', '300px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid141",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${text}",
                            '24px',
                            '24px'
                        ],
                        [
                            "eid11",
                            "display",
                            0,
                            0,
                            "linear",
                            "${neutral}",
                            'none',
                            'none'
                        ],
                        [
                            "eid10",
                            "display",
                            0,
                            0,
                            "linear",
                            "${sad}",
                            'none',
                            'none'
                        ],
                        [
                            "eid9",
                            "display",
                            0,
                            0,
                            "linear",
                            "${happy}",
                            'none',
                            'none'
                        ]
                    ]
                }
            },
            "buttons": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'btn_check',
                            symbolName: 'btn_check',
                            rect: ['0px', '0px', '84', '39', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'btn_answer',
                            symbolName: 'btn_answer',
                            rect: ['188px', '0px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'btn_restart',
                            symbolName: 'btn_restart',
                            rect: ['94px', '0px', null, null, 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '272px', '39px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "comp_evaluator": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'buttons',
                            symbolName: 'buttons',
                            rect: ['364px', '549px', '272', '39', 'auto', 'auto']
                        },
                        {
                            rect: ['0px', '0px', '1000px', '600px', 'auto', 'auto'],
                            type: 'rect',
                            id: 'blind',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            display: 'none',
                            fill: ['rgba(255,255,255,0.75)']
                        },
                        {
                            rect: ['270px', '148px', '450', '300', 'auto', 'auto'],
                            id: 'modal',
                            symbolName: 'modal',
                            type: 'rect',
                            display: 'none'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '0px', '0px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid13",
                            "display",
                            0,
                            0,
                            "linear",
                            "${modal}",
                            'none',
                            'none'
                        ],
                        [
                            "eid15",
                            "display",
                            0,
                            0,
                            "linear",
                            "${blind}",
                            'none',
                            'none'
                        ]
                    ]
                }
            },
            "btn_restart": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '80px', '35px', 'auto', 'auto'],
                            borderRadius: ['20px', '20px', '20px', '20px 20px'],
                            id: 'bg',
                            stroke: [2, 'rgba(79,136,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.99)']
                        },
                        {
                            rect: ['31px', '9px', '25px', '22px', 'auto', 'auto'],
                            id: 'neutral',
                            type: 'image',
                            display: 'block',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet.png', '-300px', '-50px', '1000px', '1000px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '84px', '39px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid12",
                            "display",
                            0,
                            0,
                            "linear",
                            "${neutral}",
                            'block',
                            'block'
                        ]
                    ]
                }
            },
            "btn_check": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '80px', '35px', 'auto', 'auto'],
                            borderRadius: ['20px 20px', '20px 20px', '20px 20px', '20px 20px'],
                            id: 'bg',
                            stroke: [2, 'rgba(79,136,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.99)']
                        },
                        {
                            rect: ['29px', '11px', '26px', '18px', 'auto', 'auto'],
                            id: 'neutral',
                            type: 'image',
                            display: 'block',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet.png', '-300px', '0px', '1000px', '1000px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '84px', '39px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid12",
                            "display",
                            0,
                            0,
                            "linear",
                            "${neutral}",
                            'block',
                            'block'
                        ]
                    ]
                }
            },
            "btn_close": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            s: null,
                            r: null,
                            id: 'Rectangle2Copy',
                            t: 'rect',
                            f: null,
                            tf: null,
                            rect: ['-2px', '7px', '18px', '2px', 'auto', 'auto'],
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            fill: ['rgba(170,170,170,1.00)']
                        },
                        {
                            type: 'rect',
                            s: null,
                            r: null,
                            id: 'Rectangle2Copy2',
                            t: 'rect',
                            f: null,
                            tf: null,
                            rect: ['-2px', '7px', '18px', '2px', 'auto', 'auto'],
                            transform: [[], ['45'], [0, 0, 0], [1, 1, 1]],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            fill: ['rgba(170,170,170,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '14px', '14px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "halfling": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '96px', '96px', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'Ellipse',
                            stroke: [0, 'rgba(255,255,255,0.51)', 'solid'],
                            type: 'ellipse',
                            fill: ['rgba(255,255,255,0.44)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, '48px', '96px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "half_dot": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'halfling2',
                            symbolName: 'halfling',
                            rect: ['0px', '0px', null, null, 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, '48px', '96px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid16",
                            "-webkit-transform-origin",
                            0,
                            0,
                            "linear",
                            "${halfling2}",
                            [100,50],
                            [100,50],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid157",
                            "-moz-transform-origin",
                            0,
                            0,
                            "linear",
                            "${halfling2}",
                            [100,50],
                            [100,50],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid158",
                            "-ms-transform-origin",
                            0,
                            0,
                            "linear",
                            "${halfling2}",
                            [100,50],
                            [100,50],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid159",
                            "msTransformOrigin",
                            0,
                            0,
                            "linear",
                            "${halfling2}",
                            [100,50],
                            [100,50],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid160",
                            "-o-transform-origin",
                            0,
                            0,
                            "linear",
                            "${halfling2}",
                            [100,50],
                            [100,50],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid161",
                            "transform-origin",
                            0,
                            0,
                            "linear",
                            "${halfling2}",
                            [100,50],
                            [100,50],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ]
                    ]
                }
            },
            "counter": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'left_side',
                            symbolName: 'half_dot',
                            rect: ['0px', '0px', null, null, 'auto', 'auto']
                        },
                        {
                            transform: [[], ['-180'], [0, 0, 0], [1, 1, 1]],
                            id: 'right_side',
                            symbolName: 'half_dot',
                            rect: ['48px', '0px', null, null, 'auto', 'auto'],
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '96px', '96px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("index_edgeActions.js");
})("EDGE-2603602");
