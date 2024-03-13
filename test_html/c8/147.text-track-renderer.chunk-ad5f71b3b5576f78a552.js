"use strict";
(self.webpackChunk_canalplus_oneplayer = self.webpackChunk_canalplus_oneplayer || []).push([
    [147], {
        57003: (e, t, i) => {
            if (i.d(t, {
                    Dl: () => D,
                    M4: () => p,
                    N8: () => I,
                    Q$: () => U,
                    RV: () => S,
                    S1: () => c,
                    bD: () => h,
                    bQ: () => F,
                    c9: () => u,
                    it: () => A,
                    k6: () => R,
                    kk: () => L,
                    qo: () => O,
                    u_: () => T,
                    w0: () => d,
                    x6: () => N,
                    y4: () => f
                }), 9533 != i.j) var n = i(76821);
            if (9533 != i.j) var s = i(85508);
            var r = i(98333);
            if (9533 != i.j) var o = i(21770);
            if (9533 != i.j) var _ = i(79874);
            if (9533 != i.j) var E = i(82401);
            const l = ["", "webkit", "moz", "ms"];

            function a(e, t) {
                return t.filter((t => function (e, t) {
                    const i = document.createElement(e.tagName),
                        n = "on" + t;
                    return n in i || (i.setAttribute(n, "return;"), "function" == typeof i[n])
                }(e, t)))[0]
            }

            function c(e, t) {
                let i;
                const n = function (e, t) {
                    return e.reduce(((e, i) => e.concat((void 0 === t ? l : t).map((e => e + i)))), [])
                }(e, t);
                return (e, t, s) => {
                    if (!s.isCancelled()) {
                        if ("undefined" != typeof HTMLElement && e instanceof HTMLElement) {
                            if (void 0 === i && (i = a(e, n)), !(0, r.Z)(i)) return void 0;
                            e.addEventListener(i, t), s.register((() => {
                                void 0 !== i && e.removeEventListener(i, t)
                            }))
                        }
                        n.forEach((i => {
                            let n = !1;
                            "function" == typeof e.addEventListener ? e.addEventListener(i, t) : (n = !0, e["on" + i] = t), s.register((() => {
                                "function" == typeof e.removeEventListener && e.removeEventListener(i, t), n && delete e["on" + i]
                            }))
                        }))
                    }
                }
            }

            function d(e, t) {
                const i = e;
                if (!0 === i.webkitSupportsPresentationMode && "function" == typeof i.webkitSetPresentationMode) {
                    const e = "picture-in-picture" === i.webkitPresentationMode,
                        n = new E.Z({
                            isEnabled: e,
                            pipWindow: null
                        }, t);
                    return v(i, "webkitpresentationmodechanged", (() => {
                        const e = "picture-in-picture" === i.webkitPresentationMode;
                        n.setValue({
                            isEnabled: e,
                            pipWindow: null
                        })
                    }), t), n
                }
                const n = document.pictureInPictureElement === i,
                    s = new E.Z({
                        isEnabled: n,
                        pipWindow: null
                    }, t);
                return v(i, "enterpictureinpicture", (e => {
                    var t;
                    s.setValue({
                        isEnabled: !0,
                        pipWindow: null !== (t = e.pictureInPictureWindow) && void 0 !== t ? t : null
                    })
                }), t), v(i, "leavepictureinpicture", (() => {
                    s.setValue({
                        isEnabled: !1,
                        pipWindow: null
                    })
                }), t), s
            }

            function A(e, t) {
                const i = function (e) {
                    let t;
                    const i = document;
                    (0, o.Z)(i.hidden) ? (0, o.Z)(i.mozHidden) ? (0, o.Z)(i.msHidden) ? (0, o.Z)(i.webkitHidden) || (t = "webkit") : t = "ms": t = "moz": t = "";
                    const n = (0, r.Z)(t) ? t + "Hidden" : "hidden",
                        s = (0, r.Z)(t) ? t + "visibilitychange" : "visibilitychange",
                        _ = document[n],
                        l = new E.Z(!_, e);
                    return v(document, s, (() => {
                        const e = !document[n];
                        l.setValueIfChanged(e)
                    }), e), l
                }(t);
                let s;
                const _ = new E.Z(!0, t);
                return t.register((() => {
                    clearTimeout(s), s = void 0
                })), i.onUpdate(l, {
                    clearSignal: t
                }), e.onUpdate(l, {
                    clearSignal: t
                }), l(), _;

                function l() {
                    if (clearTimeout(s), s = void 0, e.getValue().isEnabled || i.getValue()) _.setValueIfChanged(!0);
                    else {
                        const e = n.Z.getCurrent().INACTIVITY_DELAY;
                        s = setTimeout((() => {
                            _.setValueIfChanged(!1)
                        }), e)
                    }
                }
            }

            function u(e) {
                var t, i;
                const n = (0, o.Z)(s.Z.devicePixelRatio) || 0 === s.Z.devicePixelRatio ? 1 : s.Z.devicePixelRatio,
                    r = new E.Z({
                        width: null === (t = s.Z.screen) || void 0 === t ? void 0 : t.width,
                        height: null === (i = s.Z.screen) || void 0 === i ? void 0 : i.height,
                        pixelRatio: n
                    }, e),
                    _ = setInterval((function () {
                        const e = r.getValue();
                        e.width === screen.width && e.height === screen.height && e.pixelRatio === n || r.setValue({
                            width: screen.width,
                            height: screen.height,
                            pixelRatio: n
                        })
                    }), 2e4);
                return e.register((function () {
                    clearInterval(_)
                })), r
            }

            function h(e, t, i) {
                const n = (0, o.Z)(s.Z.devicePixelRatio) || 0 === s.Z.devicePixelRatio ? 1 : s.Z.devicePixelRatio,
                    r = new E.Z({
                        width: e.clientWidth,
                        height: e.clientHeight,
                        pixelRatio: n
                    }, i);
                let l = _.Z;
                t.onUpdate(c, {
                    clearSignal: i
                }), v(s.Z, "resize", c, i), v(e, "enterpictureinpicture", c, i), v(e, "leavepictureinpicture", c, i);
                const a = setInterval(c, 2e4);
                return c(), i.register((function () {
                    l(), clearInterval(a)
                })), r;

                function c() {
                    l();
                    const i = t.getValue(),
                        s = i.pipWindow;
                    if (i.isEnabled)
                        if ((0, o.Z)(s)) {
                            const e = r.getValue();
                            void 0 === e.width && void 0 === e.height && e.pixelRatio === n || r.setValue({
                                width: void 0,
                                height: void 0,
                                pixelRatio: n
                            })
                        } else {
                            const e = () => {
                                E()
                            };
                            s.addEventListener("resize", e), l = () => {
                                s.removeEventListener("resize", e), l = _.Z
                            }, E()
                        }
                    else {
                        const t = r.getValue();
                        t.width === e.clientWidth && t.height === e.clientHeight && t.pixelRatio === n || r.setValue({
                            width: e.clientWidth,
                            height: e.clientHeight,
                            pixelRatio: n
                        })
                    }

                    function E() {
                        const e = r.getValue();
                        e.width === (null == s ? void 0 : s.width) && e.height === (null == s ? void 0 : s.height) && e.pixelRatio === n || r.setValue({
                            width: null == s ? void 0 : s.width,
                            height: null == s ? void 0 : s.height,
                            pixelRatio: n
                        })
                    }
                }
            }
            c(["loadedmetadata"]), c(["timeupdate"]), c(["addtrack"]), c(["removetrack"]);
            const T = c(["sourceopen", "webkitsourceopen"]),
                R = c(["sourceclose", "webkitsourceclose"]),
                I = c(["sourceended", "webkitsourceended"]),
                f = c(["update"]),
                N = c(["removesourcebuffer"]),
                S = c(["keymessage", "message"]),
                L = c(["keyadded", "ready"]),
                D = c(["keyerror", "error"]),
                O = c(["keystatuseschange"]),
                U = c(["seeking"]),
                F = c(["seeked"]),
                p = c(["ended"]);

            function v(e, t, i, n) {
                e.addEventListener(t, i), n.register((() => {
                    e.removeEventListener(t, i)
                }))
            }
        },
        76821: (e, t, i) => {
            i.d(t, {
                Z: () => E
            });
            const n = {
                DEFAULT_REQUEST_TIMEOUT: 3e4,
                DEFAULT_CONNECTION_TIMEOUT: 15e3,
                DEFAULT_TEXT_TRACK_MODE: "native",
                DEFAULT_ENABLE_FAST_SWITCHING: !0,
                DELTA_POSITION_AFTER_RELOAD: {
                    bitrateSwitch: -.1,
                    trackSwitch: {
                        audio: 0,
                        video: 0,
                        other: 0
                    }
                },
                DEFAULT_CODEC_SWITCHING_BEHAVIOR: "continue",
                DEFAULT_AUTO_PLAY: !1,
                DEFAULT_WANTED_BUFFER_AHEAD: 30,
                DEFAULT_MAX_BUFFER_AHEAD: 1 / 0,
                DEFAULT_MAX_BUFFER_BEHIND: 1 / 0,
                DEFAULT_MAX_VIDEO_BUFFER_SIZE: 1 / 0,
                MAXIMUM_MAX_BUFFER_AHEAD: {
                    text: 18e3
                },
                MINIMUM_MAX_BUFFER_AHEAD: {
                    text: 120
                },
                MAXIMUM_MAX_BUFFER_BEHIND: {
                    text: 18e3
                },
                DEFAULT_BASE_BANDWIDTH: 0,
                INACTIVITY_DELAY: 6e4,
                DEFAULT_THROTTLE_VIDEO_BITRATE_WHEN_HIDDEN: !1,
                DEFAULT_VIDEO_RESOLUTION_LIMIT: "none",
                DEFAULT_LIVE_GAP: {
                    DEFAULT: 10,
                    LOW_LATENCY: 3.5
                },
                BUFFER_DISCONTINUITY_THRESHOLD: .2,
                BITRATE_REBUFFERING_RATIO: 1.5,
                DEFAULT_MAX_MANIFEST_REQUEST_RETRY: 4,
                DEFAULT_CDN_DOWNGRADE_TIME: 60,
                DEFAULT_MAX_REQUESTS_RETRY_ON_ERROR: 4,
                INITIAL_BACKOFF_DELAY_BASE: {
                    REGULAR: 200,
                    LOW_LATENCY: 50
                },
                MAX_BACKOFF_DELAY_BASE: {
                    REGULAR: 3e3,
                    LOW_LATENCY: 1e3
                },
                SAMPLING_INTERVAL_MEDIASOURCE: 1e3,
                SAMPLING_INTERVAL_LOW_LATENCY: 500,
                SAMPLING_INTERVAL_NO_MEDIASOURCE: 500,
                ABR_ENTER_BUFFER_BASED_ALGO: 10,
                ABR_EXIT_BUFFER_BASED_ALGO: 5,
                ABR_MINIMUM_TOTAL_BYTES: 15e4,
                ABR_MINIMUM_CHUNK_SIZE: 16e3,
                ABR_STARVATION_FACTOR: {
                    DEFAULT: .72,
                    LOW_LATENCY: .72
                },
                ABR_REGULAR_FACTOR: {
                    DEFAULT: .72,
                    LOW_LATENCY: .72
                },
                ABR_STARVATION_GAP: {
                    DEFAULT: 5,
                    LOW_LATENCY: 5
                },
                OUT_OF_STARVATION_GAP: {
                    DEFAULT: 7,
                    LOW_LATENCY: 7
                },
                ABR_STARVATION_DURATION_DELTA: .1,
                ABR_FAST_EMA: 2,
                ABR_SLOW_EMA: 10,
                RESUME_GAP_AFTER_SEEKING: {
                    DEFAULT: 1.5,
                    LOW_LATENCY: .5
                },
                RESUME_GAP_AFTER_NOT_ENOUGH_DATA: {
                    DEFAULT: .5,
                    LOW_LATENCY: .5
                },
                RESUME_GAP_AFTER_BUFFERING: {
                    DEFAULT: 5,
                    LOW_LATENCY: .5
                },
                REBUFFERING_GAP: {
                    DEFAULT: .5,
                    LOW_LATENCY: .2
                },
                MINIMUM_BUFFER_AMOUNT_BEFORE_FREEZING: 2,
                UNFREEZING_SEEK_DELAY: 6e3,
                FREEZING_STALLED_DELAY: 600,
                UNFREEZING_DELTA_POSITION: .001,
                SEGMENT_SYNCHRONIZATION_DELAY: 1500,
                MISSING_DATA_TRIGGER_SYNC_DELAY: .1,
                MAX_TIME_MISSING_FROM_COMPLETE_SEGMENT: .15,
                MAX_MANIFEST_BUFFERED_START_END_DIFFERENCE: .4,
                MAX_MANIFEST_BUFFERED_DURATION_DIFFERENCE: .3,
                MINIMUM_SEGMENT_SIZE: .005,
                APPEND_WINDOW_SECURITIES: {
                    START: .2,
                    END: .1
                },
                MAXIMUM_HTML_TEXT_TRACK_UPDATE_INTERVAL: 50,
                TEXT_TRACK_SIZE_CHECKS_INTERVAL: 250,
                BUFFER_PADDING: {
                    audio: 1,
                    video: 3,
                    other: 1
                },
                SEGMENT_PRIORITIES_STEPS: [2, 4, 8, 12, 18, 25],
                MAX_HIGH_PRIORITY_LEVEL: 1,
                MIN_CANCELABLE_PRIORITY: 3,
                EME_DEFAULT_VIDEO_CODECS: ['video/mp4;codecs="avc1.4d401e"', 'video/mp4;codecs="avc1.42e01e"', 'video/webm;codecs="vp8"'],
                EME_DEFAULT_AUDIO_CODECS: ['audio/mp4;codecs="mp4a.40.2"', "audio/webm;codecs=opus"],
                EME_DEFAULT_WIDEVINE_ROBUSTNESSES: ["HW_SECURE_ALL", "HW_SECURE_DECODE", "HW_SECURE_CRYPTO", "SW_SECURE_DECODE", "SW_SECURE_CRYPTO"],
                EME_DEFAULT_PLAYREADY_RECOMMENDATION_ROBUSTNESSES: ["3000", "2000"],
                EME_KEY_SYSTEMS: {
                    clearkey: ["webkit-org.w3.clearkey", "org.w3.clearkey"],
                    widevine: ["com.widevine.alpha"],
                    playready: ["com.microsoft.playready.recommendation", "com.microsoft.playready", "com.chromecast.playready", "com.youtube.playready"],
                    fairplay: ["com.apple.fps.1_0"]
                },
                MAX_CONSECUTIVE_MANIFEST_PARSING_IN_UNSAFE_MODE: 10,
                MIN_MANIFEST_PARSING_TIME_TO_ENTER_UNSAFE_MODE: 200,
                MIN_DASH_S_ELEMENTS_TO_PARSE_UNSAFELY: 300,
                OUT_OF_SYNC_MANIFEST_REFRESH_DELAY: 3e3,
                FAILED_PARTIAL_UPDATE_MANIFEST_REFRESH_DELAY: 3e3,
                DASH_FALLBACK_LIFETIME_WHEN_MINIMUM_UPDATE_PERIOD_EQUAL_0: 3,
                EME_DEFAULT_MAX_SIMULTANEOUS_MEDIA_KEY_SESSIONS: 15,
                EME_MAX_STORED_PERSISTENT_SESSION_INFORMATION: 1e3,
                EME_WAITING_DELAY_LOADED_SESSION_EMPTY_KEYSTATUSES: 100,
                FORCED_ENDED_THRESHOLD: 8e-4,
                ADAP_REP_SWITCH_BUFFER_PADDINGS: {
                    video: {
                        before: 5,
                        after: 5
                    },
                    audio: {
                        before: 2,
                        after: 2.5
                    },
                    text: {
                        before: 0,
                        after: 0
                    }
                },
                SOURCE_BUFFER_FLUSHING_INTERVAL: 500,
                CONTENT_REPLACEMENT_PADDING: 1.2,
                CACHE_LOAD_DURATION_THRESHOLDS: {
                    video: 50,
                    audio: 10
                },
                STREAM_EVENT_EMITTER_POLL_INTERVAL: 250,
                DEFAULT_MAXIMUM_TIME_ROUNDING_ERROR: .001,
                BUFFERED_HISTORY_RETENTION_TIME: 6e4,
                BUFFERED_HISTORY_MAXIMUM_ENTRIES: 200,
                MIN_BUFFER_AHEAD: 5,
                UPTO_CURRENT_POSITION_CLEANUP: 5,
                DEFAULT_VIDEO_REPRESENTATIONS_SWITCHING_MODE: "seamless",
                DEFAULT_AUDIO_REPRESENTATIONS_SWITCHING_MODE: "seamless",
                DEFAULT_VIDEO_TRACK_SWITCHING_MODE: "reload",
                DEFAULT_AUDIO_TRACK_SWITCHING_MODE: "seamless"
            };
            var s = i(76001);

            function r(e) {
                return null != e && !Array.isArray(e) && "object" == typeof e
            }

            function o(e, ...t) {
                if (0 === t.length) return e;
                const i = t.shift();
                if (r(e) && r(i))
                    for (const t in i)
                        if (r(i[t])) {
                            let n = e[t];
                            void 0 === n && (n = {}, e[t] = n), o(n, i[t])
                        } else(0, s.Z)(e, {
                            [t]: i[t]
                        });
                return o(e, ...t)
            }
            const _ = new class {
                    constructor() {
                        this._config = n
                    }
                    update(e) {
                        const t = o(this._config, e);
                        this._config = t
                    }
                    getCurrent() {
                        return this._config
                    }
                },
                E = _
        },
        85179: (e, t, i) => {
            i.d(t, {
                Z: () => r
            });
            var n = i(21770),
                s = i(42248);

            function r(e) {
                for (let t = 0; t < e.length; t++) {
                    const i = e[t];
                    if ("function" == typeof i) i(s.Z);
                    else {
                        if ((0, n.Z)(i) || "function" != typeof i._addFeature) throw new Error("Unrecognized feature");
                        i._addFeature(s.Z)
                    }
                }
            }
        },
        35956: (e, t, i) => {
            i.d(t, {
                Z: () => n
            });
            const n = new(i(43741).Z)
        },
        7626: (e, t, i) => {
            i.r(t), i.d(t, {
                SAMI_PARSER: () => r.u,
                SRT_PARSER: () => o.D,
                TTML_PARSER: () => _.G,
                VTT_PARSER: () => E.Z,
                default: () => l
            });
            var n = i(85179),
                s = i(29706);
            var r = i(88387),
                o = i(77024),
                _ = i(48523),
                E = i(88845);
            const l = class {
                static addParsers(e) {
                    (0, n.Z)(e)
                }
                constructor({
                    videoElement: e,
                    textTrackElement: t
                }) {
                    this._displayer = new s.Z(e, t)
                }
                setTextTrack(e) {
                    this._displayer.reset();
                    const t = "number" == typeof e.timeOffset ? e.timeOffset : 0;
                    this._displayer.pushTextData({
                        timestampOffset: t,
                        appendWindow: [0, 1 / 0],
                        chunk: {
                            start: 0,
                            end: Number.MAX_VALUE,
                            data: e.data,
                            language: e.language,
                            type: e.type
                        }
                    })
                }
                removeTextTrack() {
                    this._displayer.removeBuffer(0, Number.MAX_VALUE)
                }
                dispose() {
                    this._displayer.stop()
                }
            }
        },
        14103: (e, t, i) => {
            function n(e, t, i) {
                if ("function" == typeof Array.prototype.find) return e.find(t, i);
                const n = e.length >>> 0;
                for (let s = 0; s < n; s++) {
                    const n = e[s];
                    if (t.call(i, n, s, e)) return n
                }
            }
            i.d(t, {
                Z: () => n
            })
        },
        39165: (e, t, i) => {
            function n(e, t, i) {
                if ("function" == typeof Array.prototype.findIndex) return e.findIndex(t, i);
                const n = e.length >>> 0;
                for (let s = 0; s < n; s++)
                    if (t.call(i, e[s], s, e)) return s;
                return -1
            }
            i.d(t, {
                Z: () => n
            })
        },
        54089: (e, t, i) => {
            if (i.d(t, {
                    UT: () => _,
                    ZP: () => r,
                    u2: () => o
                }), 9533 != i.j) var n = i(21770);
            class s extends(9533 != i.j ? Error : null) {
                constructor(e) {
                    super(), Object.setPrototypeOf(this, s.prototype), this.name = "AssertionError", this.message = e
                }
            }

            function r(e, t) {
                0
            }

            function o(e, t, i = "object") {
                r((0, n.Z)(e));
                for (const i in t) t.hasOwnProperty(i) && r((e[i], t[i]), t[i])
            }

            function _(e) {
                throw new s("Unreachable path taken")
            }
        },
        87501: (e, t, i) => {
            i.d(t, {
                Z: () => s
            });
            var n = i(21770);
            class s {
                constructor() {
                    this._listeners = {}
                }
                addEventListener(e, t, i) {
                    const n = this._listeners[e];
                    Array.isArray(n) ? n.push(t) : this._listeners[e] = [t], void 0 !== i && i.register((() => {
                        this.removeEventListener(e, t)
                    }))
                }
                removeEventListener(e, t) {
                    if ((0, n.Z)(e)) return void(this._listeners = {});
                    const i = this._listeners[e];
                    if (!Array.isArray(i)) return;
                    if ((0, n.Z)(t)) return void delete this._listeners[e];
                    const s = i.indexOf(t); - 1 !== s && i.splice(s, 1), 0 === i.length && delete this._listeners[e]
                }
                trigger(e, t) {
                    const i = this._listeners[e];
                    Array.isArray(i) && i.slice().forEach((e => {
                        try {
                            e(t)
                        } catch (e) {
                            0,
                            console.error("RxPlayer: EventEmitter error", e instanceof Error ? e : null)
                        }
                    }))
                }
            }
        },
        85508: (e, t, i) => {
            i.d(t, {
                Z: () => r
            });
            var n = i(85884);
            let s;
            s = i(75931).Z ? self : n.Z ? i.g : window;
            const r = s
        },
        85884: (e, t, i) => {
            i.d(t, {
                Z: () => s
            });
            var n = i(75931);
            const s = "undefined" == typeof window && !n.Z
        },
        98333: (e, t, i) => {
            function n(e) {
                return "string" == typeof e && e.length > 0
            }
            i.d(t, {
                Z: () => n
            })
        },
        21770: (e, t, i) => {
            function n(e) {
                return null == e
            }
            i.d(t, {
                Z: () => n
            })
        },
        75931: (e, t, i) => {
            i.d(t, {
                Z: () => n
            });
            const n = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
        },
        43741: (e, t, i) => {
            i.d(t, {
                Z: () => r
            });
            var n = i(87501),
                s = i(79874);
            class r extends n.Z {
                constructor() {
                    super(), this.error = s.Z, this.warn = s.Z, this.info = s.Z, this.debug = s.Z, this._levels = {
                        NONE: 0,
                        ERROR: 1,
                        WARNING: 2,
                        INFO: 3,
                        DEBUG: 4
                    }, this._currentLevel = "NONE"
                }
                setLevel(e, t) {
                    let i;
                    const n = this._levels[e];
                    "number" == typeof n ? (i = n, this._currentLevel = e) : (i = 0, this._currentLevel = "NONE"), void 0 === t ? (this.error = i >= this._levels.ERROR ? console.error.bind(console) : s.Z, this.warn = i >= this._levels.WARNING ? console.warn.bind(console) : s.Z, this.info = i >= this._levels.INFO ? console.info.bind(console) : s.Z, this.debug = i >= this._levels.DEBUG ? console.log.bind(console) : s.Z) : (this.error = i >= this._levels.ERROR ? (...e) => t("ERROR", e) : s.Z, this.warn = i >= this._levels.WARNING ? (...e) => t("WARNING", e) : s.Z, this.info = i >= this._levels.INFO ? (...e) => t("INFO", e) : s.Z, this.debug = i >= this._levels.DEBUG ? (...e) => t("DEBUG", e) : s.Z), this.trigger("onLogLevelChange", this._currentLevel)
                }
                getLevel() {
                    return this._currentLevel
                }
                hasLevel(e) {
                    return this._levels[e] >= this._levels[this._currentLevel]
                }
            }
        },
        79874: (e, t, i) => {
            function n() {}
            i.d(t, {
                Z: () => n
            })
        },
        76001: (e, t, i) => {
            i.d(t, {
                Z: () => n
            });
            const n = "function" == typeof Object.assign ? Object.assign : function (e, ...t) {
                if (null == e) throw new TypeError("Cannot convert undefined or null to object");
                const i = Object(e);
                for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    for (const e in n) Object.prototype.hasOwnProperty.call(n, e) && (i[e] = n[e])
                }
                return i
            }
        },
        82401: (e, t, i) => {
            i.d(t, {
                Z: () => _,
                l: () => o
            });
            var n = i(39165),
                s = i(79874);
            class r {
                constructor(e, t) {
                    this._value = e, this._listeners = [], this._isFinished = !1, this._onFinishCbs = [], void 0 !== t && (this._deregisterCancellation = t.register((() => this.finish())))
                }
                getValue() {
                    return this._value
                }
                setValue(e) {
                    if (this._isFinished) return void 0;
                    if (this._value = e, 0 === this._listeners.length) return;
                    const t = this._listeners.slice();
                    for (const i of t) try {
                        i.hasBeenCleared || i.trigger(e, i.complete)
                    } catch (e) {}
                }
                setValueIfChanged(e) {
                    e !== this._value && this.setValue(e)
                }
                onUpdate(e, t) {
                    const i = () => {
                            if (void 0 !== (null == t ? void 0 : t.clearSignal) && t.clearSignal.deregister(i), n.hasBeenCleared) return;
                            n.hasBeenCleared = !0;
                            const e = this._listeners.indexOf(n);
                            e >= 0 && this._listeners.splice(e, 1)
                        },
                        n = {
                            trigger: e,
                            complete: i,
                            hasBeenCleared: !1
                        };
                    this._listeners.push(n), !0 === (null == t ? void 0 : t.emitCurrentValue) && e(this._value, i), this._isFinished || n.hasBeenCleared ? i() : void 0 !== (null == t ? void 0 : t.clearSignal) && t.clearSignal.register(i)
                }
                waitUntilDefined(e, t) {
                    this.onUpdate(((t, i) => {
                        void 0 !== t && (i(), e(this._value))
                    }), {
                        clearSignal: null == t ? void 0 : t.clearSignal,
                        emitCurrentValue: !0
                    })
                }
                _onFinished(e, t) {
                    if (t.isCancelled()) return s.Z;
                    const i = () => {
                            const e = (0, n.Z)(this._onFinishCbs, (e => e.trigger === r));
                            e >= 0 && (this._onFinishCbs[e].hasBeenCleared = !0, this._onFinishCbs.splice(e, 1))
                        },
                        r = () => {
                            i(), e()
                        },
                        o = t.register(i);
                    return this._onFinishCbs.push({
                        trigger: r,
                        hasBeenCleared: !1
                    }), o
                }
                finish() {
                    void 0 !== this._deregisterCancellation && this._deregisterCancellation(), this._isFinished = !0;
                    const e = this._listeners.slice();
                    for (const t of e) try {
                        t.hasBeenCleared || (t.complete(), t.hasBeenCleared = !0)
                    } catch (e) {}
                    if (this._listeners.length = 0, this._onFinishCbs.length > 0) {
                        const e = this._onFinishCbs.slice();
                        for (const t of e) try {
                            t.hasBeenCleared || (t.trigger(), t.hasBeenCleared = !0)
                        } catch (e) {}
                        this._onFinishCbs.length = 0
                    }
                }
            }

            function o(e, t, i) {
                const n = new r(t(e.getValue()), i);
                return e.onUpdate((function (e) {
                    n.setValue(t(e))
                }), {
                    clearSignal: i
                }), e._onFinished((() => {
                    n.finish()
                }), i), n
            }
            const _ = r
        },
        36944: (e, t, i) => {
            function n(e, t, i) {
                if ("function" == typeof String.prototype.startsWith) return e.startsWith(t, i);
                const n = "number" == typeof i ? Math.max(i, 0) : 0;
                return e.substring(n, n + t.length) === t
            }
            i.d(t, {
                Z: () => n
            })
        },
        64361: (e, t, i) => {
            i.d(t, {
                FU: () => E,
                XG: () => _,
                ZP: () => o
            });
            var n = i(35956),
                s = i(54089),
                r = i(79874);
            class o {
                constructor() {
                    const e = function () {
                            let e = r.Z;
                            return [function (t) {
                                e(t)
                            }, function (t) {
                                e = t
                            }]
                        }(),
                        t = e[0],
                        i = e[1];
                    this._isUsed = !1, this._trigger = t, this.signal = new _(i)
                }
                isUsed() {
                    return this._isUsed
                }
                linkToSignal(e) {
                    const t = e.register((() => {
                        this.cancel()
                    }));
                    return this.signal.register(t), t
                }
                cancel(e) {
                    if (this._isUsed) return;
                    this._isUsed = !0;
                    const t = null != e ? e : new E;
                    this._trigger(t)
                }
                static isCancellationError(e) {
                    return e instanceof E
                }
            }
            class _ {
                constructor(e) {
                    this._isCancelled = !1, this.cancellationError = null, this._listeners = [], e((e => {
                        for (this.cancellationError = e, this._isCancelled = !0; this._listeners.length > 0;) try {
                            const t = this._listeners.pop();
                            null == t || t(e)
                        } catch (e) {
                            n.Z.error("Error while calling clean up listener", e instanceof Error ? e.toString() : "Unknown error")
                        }
                    }))
                }
                isCancelled() {
                    return this._isCancelled
                }
                register(e) {
                    return this._isCancelled ? ((0, s.ZP)(null !== this.cancellationError), e(this.cancellationError), r.Z) : (this._listeners.push(e), () => this.deregister(e))
                }
                deregister(e) {
                    for (let t = this._listeners.length - 1; t >= 0; t--) this._listeners[t] === e && this._listeners.splice(t, 1)
                }
            }
            class E extends Error {
                constructor() {
                    super(), Object.setPrototypeOf(this, E.prototype), this.name = "CancellationError", this.message = "This task was cancelled."
                }
            }
        }
    }
]);