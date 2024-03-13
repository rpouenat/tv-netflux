"use strict";
(self.webpackChunk_canalplus_oneplayer = self.webpackChunk_canalplus_oneplayer || []).push([
    [2609], {
        58964: (e, t, i) => {
            i.d(t, {
                Z: () => n
            });
            const n = "function" == typeof MediaSource && !0 === MediaSource.canConstructInDedicatedWorker
        },
        26741: (e, t, i) => {
            i.d(t, {
                Z: () => n
            });
            const n = "object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate
        },
        30309: (e, t, i) => {
            i.r(t), i.d(t, {
                DASH: () => Lt,
                DASH_WASM: () => ei,
                DEBUG_ELEMENT: () => vi,
                DIRECTFILE: () => Oi,
                EME: () => $n,
                HTML_SAMI_PARSER: () => Gn.u,
                HTML_SRT_PARSER: () => Xn.D,
                HTML_TEXT_BUFFER: () => jn,
                HTML_TTML_PARSER: () => Qn.G,
                HTML_VTT_PARSER: () => Yn.Z,
                MEDIA_SOURCE_MAIN: () => Jn,
                NATIVE_SAMI_PARSER: () => hs,
                NATIVE_SRT_PARSER: () => vs,
                NATIVE_TEXT_BUFFER: () => ys,
                NATIVE_TTML_PARSER: () => Ps,
                NATIVE_VTT_PARSER: () => Ms,
                SMOOTH: () => va
            });
            var n = i(13980),
                s = i(24911),
                a = i(54089),
                r = i(21770),
                o = i(76821),
                l = i(35956),
                c = i(14103),
                u = i(23906),
                d = i(60748);

            function h(e) {
                const t = Date.parse(e) - (0, u.Z)();
                if (!isNaN(t)) return t;
                l.Z.warn("DASH Parser: Invalid clock received: ", e)
            }

            function m(e) {
                const t = e.representations;
                let i = null;
                for (let e = 0; e < t.length; e++) {
                    const n = t[e].index.getLastAvailablePosition();
                    if (void 0 === n) return;
                    null !== n && (i = null === i ? n : Math.min(i, n))
                }
                return null === i ? null : i
            }

            function f(e) {
                const t = e.representations;
                let i = null;
                for (let e = 0; e < t.length; e++) {
                    const n = t[e].index.getFirstAvailablePosition();
                    if (void 0 === n) return;
                    null !== n && (i = null === i ? n : Math.max(i, n))
                }
                return null === i ? null : i
            }

            function p(e) {
                if (0 === e.length) throw new Error("DASH Parser: no period available for a dynamic content");
                const t = function (e) {
                        for (let t = 0; t <= e.length - 1; t++) {
                            const i = e[t].adaptations,
                                n = void 0 === i.audio ? void 0 : i.audio[0],
                                s = void 0 === i.video ? void 0 : i.video[0];
                            if (void 0 !== n || void 0 !== s) {
                                let e = null,
                                    t = null;
                                if (void 0 !== n) {
                                    const t = f(n);
                                    if (void 0 === t) return;
                                    e = t
                                }
                                if (void 0 !== s) {
                                    const e = f(s);
                                    if (void 0 === e) return;
                                    t = e
                                }
                                if (void 0 !== n && null === e || void 0 !== s && null === t) return void l.Z.info("Parser utils: found Period with no segment. ", "Going to next one to calculate first position");
                                if (null !== t) return null !== e ? Math.max(e, t) : t;
                                if (null !== e) return e
                            }
                        }
                    }(e),
                    i = function (e) {
                        for (let t = e.length - 1; t >= 0; t--) {
                            const i = e[t].adaptations,
                                n = void 0 === i.audio ? void 0 : i.audio[0],
                                s = void 0 === i.video ? void 0 : i.video[0];
                            if (void 0 !== n || void 0 !== s) {
                                let e = null,
                                    t = null;
                                if (void 0 !== n) {
                                    const t = m(n);
                                    if (void 0 === t) return {
                                        safe: void 0,
                                        unsafe: void 0
                                    };
                                    e = t
                                }
                                if (void 0 !== s) {
                                    const e = m(s);
                                    if (void 0 === e) return {
                                        safe: void 0,
                                        unsafe: void 0
                                    };
                                    t = e
                                }
                                if (void 0 !== n && null === e || void 0 !== s && null === t) return l.Z.info("Parser utils: found Period with no segment. ", "Going to previous one to calculate last position"), {
                                    safe: void 0,
                                    unsafe: void 0
                                };
                                if (null !== t) return null !== e ? {
                                    safe: Math.min(e, t),
                                    unsafe: Math.max(e, t)
                                } : {
                                    safe: t,
                                    unsafe: t
                                };
                                if (null !== e) return {
                                    safe: e,
                                    unsafe: e
                                }
                            }
                        }
                        return {
                            safe: void 0,
                            unsafe: void 0
                        }
                    }(e);
                return {
                    minimumSafePosition: t,
                    maximumSafePosition: i.safe,
                    maximumUnsafePosition: i.unsafe
                }
            }
            class g {
                constructor(e) {
                    this._isDynamic = e.isDynamic, this._timeShiftBufferDepth = e.isDynamic && void 0 !== e.timeShiftBufferDepth ? e.timeShiftBufferDepth : null, this._serverTimestampOffset = e.serverTimestampOffset, this._availabilityStartTime = e.availabilityStartTime
                }
                setLastPosition(e, t) {
                    this._lastPosition = e, this._positionTime = t
                }
                lastPositionIsKnown() {
                    return this._isDynamic ? void 0 !== this._positionTime && void 0 !== this._lastPosition : void 0 !== this._lastPosition
                }
                getEstimatedMinimumSegmentTime() {
                    var e;
                    if (!this._isDynamic || null === this._timeShiftBufferDepth) return 0;
                    const t = null !== (e = this.getEstimatedLiveEdge()) && void 0 !== e ? e : this.getEstimatedMaximumPosition(0);
                    if (void 0 === t) return;
                    return t - this._timeShiftBufferDepth
                }
                getEstimatedLiveEdge() {
                    if (this._isDynamic && void 0 !== this._serverTimestampOffset) return ((0, u.Z)() + this._serverTimestampOffset) / 1e3 - this._availabilityStartTime
                }
                getEstimatedMaximumPosition(e) {
                    if (!this._isDynamic) return this._lastPosition;
                    const t = this.getEstimatedLiveEdge();
                    return void 0 !== t && e !== 1 / 0 ? t + e : void 0 !== this._positionTime && void 0 !== this._lastPosition ? Math.max(this._lastPosition - this._positionTime + (0, u.Z)() / 1e3, 0) : this._lastPosition
                }
            }

            function v(e, t) {
                return "function" == typeof Array.prototype.flatMap ? e.flatMap(t) : e.reduce(((e, i) => {
                    const n = t(i);
                    return Array.isArray(n) ? (e.push(...n), e) : (e.push(n), e)
                }), [])
            }
            var y = i(50202),
                b = i(75931),
                T = i(52766),
                k = i(20573);
            var _ = i(98123),
                S = i(39165),
                w = i(73793),
                E = i(98333);
            const D = function (e, t) {
                    for (const i of t) {
                        const t = i.adaptation,
                            n = i.trickModeAttachedAdaptationIds;
                        for (const i of n)
                            for (const n of _.rX) {
                                const s = e[n];
                                if (void 0 !== s)
                                    for (const e of s) e.id === i && (void 0 === e.trickModeTracks && (e.trickModeTracks = []), e.trickModeTracks.push(t))
                            }
                    }
                },
                x = ["subtitle", "caption"];

            function P(e, t, i, n) {
                function s(e, t) {
                    const i = e.split("/")[0];
                    return (0, w.Z)(_.rX, i) ? i : "application/ttml+xml" === e || "application/mp4" === e && null !== t && void 0 !== (0, c.Z)(t, (e => "urn:mpeg:dash:role:2011" === e.schemeIdUri && (0, w.Z)(x, e.value))) ? "text" : void 0
                }

                function a(e) {
                    switch (e.substring(0, 3)) {
                    case "avc":
                    case "hev":
                    case "hvc":
                    case "vp8":
                    case "vp9":
                    case "av1":
                        return "video";
                    case "vtt":
                        return "text"
                    }
                    switch (e.substring(0, 4)) {
                    case "mp4a":
                        return "audio";
                    case "wvtt":
                    case "stpp":
                        return "text"
                    }
                }
                if (null !== t) {
                    const e = s(t, n);
                    if (void 0 !== e) return e
                }
                if (null !== i) {
                    const e = a(i);
                    if (void 0 !== e) return e
                }
                for (let t = 0; t < e.length; t++) {
                    const i = e[t].attributes,
                        r = i.mimeType,
                        o = i.codecs;
                    if (void 0 !== r) {
                        const e = s(r, n);
                        if (void 0 !== e) return e
                    }
                    if (void 0 !== o) {
                        const e = a(o);
                        if (void 0 !== e) return e
                    }
                }
            }
            var Z = i(76001);
            const I = /[, ]+/g;

            function C(e, t, i) {
                const n = e.repeatCount;
                if (n >= 0) return n;
                let s;
                return s = (0, r.Z)(t) ? void 0 !== i ? i : Number.MAX_VALUE : t.start, Math.ceil((s - e.start) / e.duration) - 1
            }

            function R(e, t, i) {
                const n = e.start,
                    s = e.duration;
                if (s <= 0) return n;
                return n + (C(e, t, i) + 1) * s
            }

            function A(e, t) {
                var i;
                return e * t.timescale + (null !== (i = t.indexTimeOffset) && void 0 !== i ? i : 0)
            }

            function M(e, t) {
                var i;
                return (e - (null !== (i = t.indexTimeOffset) && void 0 !== i ? i : 0)) / t.timescale
            }

            function N(e, t, i) {
                const n = e.timeline,
                    s = A(t, e);
                if (s < 0) return null;
                const a = function (e, t) {
                    let i = 0,
                        n = e.length;
                    for (; i < n;) {
                        const s = i + n >>> 1;
                        e[s].start <= t ? i = s + 1 : n = s
                    }
                    return i - 1
                }(n, s);
                if (a < 0 || a >= n.length - 1) return null;
                const r = n[a];
                if (r.duration <= 0) return null;
                const o = n[a + 1];
                if (void 0 === o) return null;
                const l = o.start;
                return s >= R(r, o, i) && s < l ? M(l, e) : null
            }

            function L(e, t) {
                var i;
                const n = e.initialization,
                    s = {};
                return void 0 !== t && (s.isEMSGWhitelisted = t), {
                    id: "init",
                    isInit: !0,
                    time: 0,
                    end: 0,
                    duration: 0,
                    timescale: 1,
                    range: (0, r.Z)(n) ? void 0 : n.range,
                    indexRange: e.indexRange,
                    url: null !== (i = null == n ? void 0 : n.url) && void 0 !== i ? i : null,
                    complete: !0,
                    privateInfos: s,
                    timestampOffset: -e.indexTimeOffset / e.timescale
                }
            }

            function U(e) {
                return (t, i, n) => {
                    const s = (0, E.Z)(n) ? parseInt(n, 10) : 1;
                    return function (e, t) {
                        const i = e.toString();
                        return i.length >= t ? i : (new Array(t + 1).join("0") + i).slice(-t)
                    }(String(e), s)
                }
            }

            function O(e, t, i) {
                return function (e, t, i) {
                    return -1 === e.indexOf("$") ? e : e.replace(/\$\$/g, "$").replace(/\$RepresentationID\$/g, String(t)).replace(/\$Bandwidth(\%0(\d+)d)?\$/g, U(void 0 === i ? 0 : i))
                }(e, t, i)
            }

            function z(e, t) {
                return function (i) {
                    return -1 === i.indexOf("$") ? i : i.replace(/\$\$/g, "$").replace(/\$Number(\%0(\d+)d)?\$/g, ((e, i, n) => {
                        if (void 0 === t) throw new Error("Segment number not defined in a $Number$ scheme");
                        return U(t)(e, i, n)
                    })).replace(/\$Time(\%0(\d+)d)?\$/g, ((t, i, n) => {
                        if (void 0 === e) throw new Error("Segment time not defined in a $Time$ scheme");
                        return U(e)(t, i, n)
                    }))
                }
            }

            function K(e, t, i) {
                const n = i - e;
                return n > 0 ? Math.floor(n / t) : 0
            }

            function F(e, t, i, n, s, a) {
                var r;
                const o = n.getEstimatedMaximumPosition(null !== (r = e.availabilityTimeOffset) && void 0 !== r ? r : 0),
                    l = Math.min(t + i, null != o ? o : 1 / 0),
                    c = A(t, e),
                    u = A(l, e),
                    d = e.timeline,
                    h = e.timescale,
                    m = e.segmentUrlTemplate,
                    f = e.startNumber,
                    p = e.endNumber;
                let g = null != f ? f : 1;
                const v = [],
                    y = d.length;
                for (let t = 0; t < y; t++) {
                    const i = d[t],
                        n = i.duration,
                        r = i.start,
                        l = i.range;
                    let f;
                    f = void 0 === o ? s : Math.min(o * h, null != s ? s : 1 / 0);
                    const b = C(i, d[t + 1], f),
                        T = !1 !== e.availabilityTimeComplete || t !== y - 1 && 0 !== b;
                    let k = K(r, n, c),
                        _ = r + k * n;
                    for (; _ < u && k <= b;) {
                        const t = g + k;
                        if (void 0 !== p && t > p) break;
                        const i = null === m ? null : z(_, t)(m);
                        let s = _ - e.indexTimeOffset,
                            o = n;
                        s < 0 && (o = n + s, s = 0);
                        const c = {
                            id: String(_),
                            time: s / h,
                            end: (s + o) / h,
                            duration: o / h,
                            isInit: !1,
                            range: l,
                            timescale: 1,
                            url: i,
                            number: t,
                            timestampOffset: -e.indexTimeOffset / h,
                            complete: T,
                            privateInfos: {
                                isEMSGWhitelisted: a
                            }
                        };
                        v.push(c), k++, _ = r + k * n
                    }
                    if (_ >= u) return v;
                    if (g += b + 1, void 0 !== p && g > p) return v
                }
                return v
            }

            function B(e, t) {
                if (t.timescale !== e.timescale) {
                    const i = e.timescale;
                    e.timeline.push({
                        start: t.time / t.timescale * i,
                        duration: t.duration / t.timescale * i,
                        repeatCount: void 0 === t.count ? 0 : t.count,
                        range: t.range
                    })
                } else e.timeline.push({
                    start: t.time,
                    duration: t.duration,
                    repeatCount: void 0 === t.count ? 0 : t.count,
                    range: t.range
                });
                return !0
            }
            class V {
                constructor(e, t) {
                    var i, n, s, a;
                    const o = t.periodStart,
                        l = t.periodEnd,
                        c = t.representationId,
                        u = t.representationBitrate,
                        d = t.isEMSGWhitelisted,
                        h = null !== (i = e.timescale) && void 0 !== i ? i : 1,
                        m = (null !== (n = e.presentationTimeOffset) && void 0 !== n ? n : 0) - o * h,
                        f = void 0 === (null === (s = e.initialization) || void 0 === s ? void 0 : s.media) ? null : O(e.initialization.media, c, u),
                        p = void 0 === e.media ? null : O(e.media, c, u);
                    let g;
                    void 0 !== e.initialization ? g = e.initialization.range : void 0 !== e.indexRange && (g = [0, e.indexRange[0] - 1]), this._index = {
                        indexRange: e.indexRange,
                        indexTimeOffset: m,
                        initialization: {
                            url: f,
                            range: g
                        },
                        segmentUrlTemplate: p,
                        startNumber: e.startNumber,
                        endNumber: e.endNumber,
                        timeline: null !== (a = e.timeline) && void 0 !== a ? a : [],
                        timescale: h
                    }, this._manifestBoundsCalculator = t.manifestBoundsCalculator, this._scaledPeriodStart = A(o, this._index), this._scaledPeriodEnd = (0, r.Z)(l) ? void 0 : A(l, this._index), this._isInitialized = this._index.timeline.length > 0, this._isEMSGWhitelisted = d
                }
                getInitSegment() {
                    return L(this._index, this._isEMSGWhitelisted)
                }
                getSegments(e, t) {
                    return F(this._index, e, t, this._manifestBoundsCalculator, this._scaledPeriodEnd, this._isEMSGWhitelisted)
                }
                shouldRefresh() {
                    return !1
                }
                getFirstAvailablePosition() {
                    const e = this._index;
                    return 0 === e.timeline.length ? null : M(Math.max(this._scaledPeriodStart, e.timeline[0].start), e)
                }
                getLastAvailablePosition() {
                    var e;
                    const t = this._index.timeline;
                    if (0 === t.length) return null;
                    const i = t[t.length - 1];
                    return M(Math.min(R(i, null, this._scaledPeriodEnd), null !== (e = this._scaledPeriodEnd) && void 0 !== e ? e : 1 / 0), this._index)
                }
                getEnd() {
                    return this.getLastAvailablePosition()
                }
                awaitSegmentBetween() {
                    return !1
                }
                isSegmentStillAvailable() {
                    return !0
                }
                checkDiscontinuity() {
                    return null
                }
                canBeOutOfSyncError() {
                    return !1
                }
                isStillAwaitingFutureSegments() {
                    return !1
                }
                isInitialized() {
                    return this._isInitialized
                }
                initialize(e) {
                    if (!this._isInitialized) {
                        for (let t = 0; t < e.length; t++) B(this._index, e[t]);
                        this._isInitialized = !0
                    }
                }
                addPredictedSegments() {
                    l.Z.warn("Cannot add predicted segments to a `BaseRepresentationIndex`")
                }
                _replace(e) {
                    this._index = e._index, this._isInitialized = e._isInitialized, this._scaledPeriodEnd = e._scaledPeriodEnd, this._isEMSGWhitelisted = e._isEMSGWhitelisted
                }
                _update() {
                    l.Z.error("Base RepresentationIndex: Cannot update a SegmentList")
                }
            }
            class H {
                constructor(e, t) {
                    var i, n, s;
                    if (void 0 === e.duration) throw new Error("Invalid SegmentList: no duration");
                    const a = t.periodStart,
                        o = t.periodEnd,
                        l = t.representationId,
                        c = t.representationBitrate,
                        u = t.isEMSGWhitelisted;
                    this._isEMSGWhitelisted = u, this._periodStart = a, this._periodEnd = o;
                    const d = null !== (i = e.presentationTimeOffset) && void 0 !== i ? i : 0,
                        h = null !== (n = e.timescale) && void 0 !== n ? n : 1,
                        m = d - a * h,
                        f = void 0 === (null === (s = e.initialization) || void 0 === s ? void 0 : s.media) ? null : O(e.initialization.media, l, c),
                        p = e.list.map((e => ({
                            url: void 0 === e.media ? null : O(e.media, l, c),
                            mediaRange: e.mediaRange
                        })));
                    this._index = {
                        list: p,
                        timescale: h,
                        duration: e.duration,
                        indexTimeOffset: m,
                        indexRange: e.indexRange,
                        initialization: (0, r.Z)(e.initialization) ? void 0 : {
                            url: f,
                            range: e.initialization.range
                        }
                    }
                }
                getInitSegment() {
                    const e = L(this._index);
                    return void 0 === e.privateInfos && (e.privateInfos = {}), e.privateInfos.isEMSGWhitelisted = this._isEMSGWhitelisted, e
                }
                getSegments(e, t) {
                    const i = this._index,
                        n = i.duration,
                        s = i.list,
                        a = i.timescale,
                        r = n / a,
                        o = function (e, t, i) {
                            return [e * i, (e + t) * i]
                        }(e - this._periodStart, t, a),
                        l = o[0],
                        c = o[1],
                        u = Math.min(s.length - 1, Math.floor(c / n)),
                        d = [];
                    let h = Math.floor(l / n);
                    for (; h <= u;) {
                        const e = s[h].mediaRange,
                            t = s[h].url,
                            n = h * r + this._periodStart,
                            o = {
                                id: String(h),
                                time: n,
                                isInit: !1,
                                range: e,
                                duration: r,
                                timescale: 1,
                                end: n + r,
                                url: t,
                                timestampOffset: -i.indexTimeOffset / a,
                                complete: !0,
                                privateInfos: {
                                    isEMSGWhitelisted: this._isEMSGWhitelisted
                                }
                            };
                        d.push(o), h++
                    }
                    return d
                }
                shouldRefresh(e, t) {
                    return !1
                }
                getFirstAvailablePosition() {
                    return this._periodStart
                }
                getLastAvailablePosition() {
                    var e;
                    const t = this._index,
                        i = t.duration,
                        n = t.list;
                    return Math.min(n.length * i / t.timescale + this._periodStart, null !== (e = this._periodEnd) && void 0 !== e ? e : 1 / 0)
                }
                getEnd() {
                    return this.getLastAvailablePosition()
                }
                awaitSegmentBetween() {
                    return !1
                }
                isSegmentStillAvailable() {
                    return !0
                }
                checkDiscontinuity() {
                    return null
                }
                canBeOutOfSyncError() {
                    return !1
                }
                isStillAwaitingFutureSegments() {
                    return !1
                }
                isInitialized() {
                    return !0
                }
                initialize() {
                    l.Z.error("A `ListRepresentationIndex` does not need to be initialized")
                }
                addPredictedSegments() {
                    l.Z.warn("Cannot add predicted segments to a `ListRepresentationIndex`")
                }
                _replace(e) {
                    this._index = e._index
                }
                _update() {
                    l.Z.error("A `ListRepresentationIndex` cannot be updated")
                }
            }
            var W = i(76878);

            function $(e, t) {
                let i = 0;
                for (; e.length > 0;) {
                    const n = e[0];
                    if (n.start >= t) return i;
                    if (-1 === n.repeatCount) return i;
                    if (0 === n.repeatCount) e.shift(), i += 1;
                    else {
                        const s = e[1];
                        if (void 0 !== s && s.start <= t) e.shift(), i += 1;
                        else {
                            if (n.duration <= 0) return i;
                            let s = n.start + n.duration,
                                a = 1;
                            for (; s < t && a <= n.repeatCount;) s += n.duration, a++;
                            if (!(a > n.repeatCount)) {
                                const e = n.repeatCount - a;
                                return n.start = s, n.repeatCount = e, i += a, i
                            }
                            e.shift(), i = n.repeatCount + 1
                        }
                    }
                }
                return i
            }
            var G = i(71347);

            function X(e, t) {
                if (0 === e.length) return e.push(...t), !0;
                if (0 === t.length) return !1;
                const i = e.length,
                    n = t[0].start;
                if (R(e[i - 1], t[0]) < n) throw new G.Z("MANIFEST_UPDATE_ERROR", "Cannot perform partial update: not enough data");
                for (let s = i - 1; s >= 0; s--) {
                    const a = e[s].start;
                    if (a === n) {
                        const n = i - s;
                        return e.splice(s, n, ...t), !1
                    }
                    if (a < n) {
                        const a = e[s];
                        if (a.start + a.duration > n) return l.Z.warn("RepresentationIndex: Manifest update removed all previous segments"), e.splice(0, i, ...t), !0;
                        if (void 0 === a.repeatCount || a.repeatCount <= 0) return a.repeatCount < 0 && (a.repeatCount = Math.floor((n - a.start) / a.duration) - 1), e.splice(s + 1, i - (s + 1), ...t), !1;
                        if (a.start + a.duration * (a.repeatCount + 1) <= n) return e.splice(s + 1, i - (s + 1), ...t), !1;
                        const r = (n - a.start) / a.duration - 1;
                        if (r % 1 == 0 && a.duration === t[0].duration) {
                            const n = t[0].repeatCount < 0 ? -1 : t[0].repeatCount + r + 1;
                            return e.splice(s, i - s, ...t), e[s].start = a.start, e[s].repeatCount = n, !1
                        }
                        return l.Z.warn("RepresentationIndex: Manifest update removed previous segments"), e[s].repeatCount = Math.floor(r), e.splice(s + 1, i - (s + 1), ...t), !1
                    }
                }
                const s = e[e.length - 1],
                    a = t[t.length - 1];
                if (void 0 !== s.repeatCount && s.repeatCount < 0) return s.start > a.start ? (l.Z.warn("RepresentationIndex: The new index is older than the previous one"), !1) : (l.Z.warn('RepresentationIndex: The new index is "bigger" than the previous one'), e.splice(0, i, ...t), !0);
                return s.start + s.duration * (s.repeatCount + 1) >= a.start + a.duration * (a.repeatCount + 1) ? (l.Z.warn("RepresentationIndex: The new index is older than the previous one"), !1) : (l.Z.warn('RepresentationIndex: The new index is "bigger" than the previous one'), e.splice(0, i, ...t), !0)
            }

            function q(e) {
                return o.Z.getCurrent().DEFAULT_MAXIMUM_TIME_ROUNDING_ERROR * e
            }

            function j(e, t, i) {
                let n = e.start,
                    s = e.duration;
                const a = e.repeatCount;
                return void 0 === n && (null === t ? n = 0 : (0, r.Z)(t.duration) || (n = t.start + t.duration * (t.repeatCount + 1))), void 0 !== s && !isNaN(s) || null === i || void 0 === i.start || isNaN(i.start) || void 0 === n || isNaN(n) || (s = i.start - n), void 0 === n || isNaN(n) || void 0 === s || isNaN(s) || void 0 !== a && isNaN(a) ? (l.Z.warn('DASH: A "S" Element could not have been parsed.'), null) : {
                    start: n,
                    duration: s,
                    repeatCount: void 0 === a ? 0 : a
                }
            }

            function Q(e) {
                const t = {};
                for (let i = 0; i < e.attributes.length; i++) {
                    const n = e.attributes[i];
                    switch (n.name) {
                    case "t":
                        const e = parseInt(n.value, 10);
                        isNaN(e) ? l.Z.warn(`DASH: invalid t ("${n.value}")`) : t.start = e;
                        break;
                    case "d":
                        const i = parseInt(n.value, 10);
                        isNaN(i) ? l.Z.warn(`DASH: invalid d ("${n.value}")`) : t.duration = i;
                        break;
                    case "r":
                        const s = parseInt(n.value, 10);
                        isNaN(s) ? l.Z.warn(`DASH: invalid r ("${n.value}")`) : t.repeatCount = s
                    }
                }
                return t
            }

            function Y(e) {
                const t = [];
                for (let i = 0; i < e.length; i++) t.push(Q(e[i]));
                const i = [];
                for (let e = 0; e < t.length; e++) {
                    const n = j(t[e], void 0 === i[i.length - 1] ? null : i[i.length - 1], void 0 === t[e + 1] ? null : t[e + 1]);
                    null !== n && i.push(n)
                }
                return i
            }

            function J(e, t) {
                var i;
                const n = function (e, t) {
                    if (0 === e.length || 0 === t.length) return null;
                    const i = e[0].start,
                        n = t[0].getAttribute("t"),
                        s = null === n ? null : parseInt(n, 10);
                    if (null === s || Number.isNaN(s)) return null;
                    if (i === s) return {
                        prevSegmentsIdx: 0,
                        newElementsIdx: 0,
                        repeatNumberInPrevSegments: 0,
                        repeatNumberInNewElements: 0
                    };
                    if (i < s) {
                        let t = e[0],
                            i = 0;
                        for (;;) {
                            if (t.repeatCount > 0) {
                                const e = s - t.start;
                                if (e % t.duration == 0 && e / t.duration <= t.repeatCount) return {
                                    repeatNumberInPrevSegments: e / t.duration,
                                    prevSegmentsIdx: i,
                                    newElementsIdx: 0,
                                    repeatNumberInNewElements: 0
                                }
                            }
                            if (i++, i >= e.length) return null;
                            if (t = e[i], t.start === s) return {
                                prevSegmentsIdx: i,
                                newElementsIdx: 0,
                                repeatNumberInPrevSegments: 0,
                                repeatNumberInNewElements: 0
                            };
                            if (t.start > s) return null
                        }
                    } else {
                        let e = 0,
                            n = t[0],
                            a = s;
                        for (;;) {
                            const r = n.getAttribute("d"),
                                o = null === r ? null : parseInt(r, 10);
                            if (null === o || Number.isNaN(o)) return null;
                            const l = n.getAttribute("r"),
                                c = null === l ? null : parseInt(l, 10);
                            if (null !== c) {
                                if (Number.isNaN(c) || c < 0) return null;
                                if (c > 0) {
                                    const t = i - a;
                                    if (t % o == 0 && t / o <= c) return {
                                        repeatNumberInPrevSegments: 0,
                                        repeatNumberInNewElements: t / o,
                                        prevSegmentsIdx: 0,
                                        newElementsIdx: e
                                    }
                                }
                                a += o * (c + 1)
                            } else a += o;
                            if (e++, e >= t.length) return null;
                            n = t[e];
                            const u = n.getAttribute("t"),
                                d = null === u ? null : parseInt(u, 10);
                            if (null !== d) {
                                if (Number.isNaN(d)) return null;
                                a = d
                            }
                            if (a === i) return {
                                newElementsIdx: e,
                                prevSegmentsIdx: 0,
                                repeatNumberInPrevSegments: 0,
                                repeatNumberInNewElements: 0
                            };
                            if (a > s) return null
                        }
                    }
                }(t, e);
                if (null === n) return l.Z.warn('DASH: Cannot perform "based" update. Common segment not found.'), Y(e);
                const s = n.prevSegmentsIdx,
                    a = n.newElementsIdx,
                    r = n.repeatNumberInPrevSegments,
                    o = n.repeatNumberInNewElements,
                    c = t.length - s + a - 1;
                if (c >= e.length) return l.Z.info('DASH: Cannot perform "based" update. New timeline too short'), Y(e);
                const u = t.slice(s);
                if (r > 0) {
                    const e = u[0];
                    e.start += e.duration * r, u[0].repeatCount -= r
                }
                if (o > 0 && 0 !== a) return l.Z.info('DASH: Cannot perform "based" update. The new timeline has a different form.'), Y(e);
                const d = u[u.length - 1],
                    h = Q(e[c]),
                    m = (null !== (i = h.repeatCount) && void 0 !== i ? i : 0) - o;
                if (h.duration !== d.duration || d.repeatCount > m) return l.Z.info('DASH: Cannot perform "based" update. The new timeline has a different form at the beginning.'), Y(e);
                void 0 !== h.repeatCount && h.repeatCount > d.repeatCount && (d.repeatCount = h.repeatCount);
                const f = [],
                    p = [];
                for (let t = c + 1; t < e.length; t++) p.push(Q(e[t]));
                for (let e = 0; e < p.length; e++) {
                    const t = j(p[e], void 0 === f[f.length - 1] ? d : f[f.length - 1], void 0 === p[e + 1] ? null : p[e + 1]);
                    null !== t && f.push(t)
                }
                return u.concat(f)
            }
            class ee {
                constructor(e, t) {
                    var i, n, s, a, o;
                    if (!ee.isTimelineIndexArgument(e)) throw new Error("The given index is not compatible with a TimelineRepresentationIndex.");
                    const l = t.availabilityTimeComplete,
                        c = t.availabilityTimeOffset,
                        d = t.manifestBoundsCalculator,
                        h = t.isDynamic,
                        m = t.isLastPeriod,
                        f = t.representationId,
                        p = t.representationBitrate,
                        g = t.periodStart,
                        v = t.periodEnd,
                        y = t.isEMSGWhitelisted,
                        b = null !== (i = e.timescale) && void 0 !== i ? i : 1,
                        T = (null !== (n = e.presentationTimeOffset) && void 0 !== n ? n : 0) - g * b;
                    this._manifestBoundsCalculator = d, this._isEMSGWhitelisted = y, this._isLastPeriod = m, this._lastUpdate = null !== (s = t.receivedTime) && void 0 !== s ? s : (0, u.Z)(), this._unsafelyBaseOnPreviousIndex = null, null !== t.unsafelyBaseOnPreviousRepresentation && t.unsafelyBaseOnPreviousRepresentation.index instanceof ee && (t.unsafelyBaseOnPreviousRepresentation.index._unsafelyBaseOnPreviousIndex = null, this._unsafelyBaseOnPreviousIndex = t.unsafelyBaseOnPreviousRepresentation.index), this._isDynamic = h, this._parseTimeline = null !== (a = e.timelineParser) && void 0 !== a ? a : null;
                    const k = void 0 === (null === (o = e.initialization) || void 0 === o ? void 0 : o.media) ? null : O(e.initialization.media, f, p),
                        _ = void 0 === e.media ? null : O(e.media, f, p);
                    let S;
                    S = void 0 === c && void 0 === l ? 1 / 0 : null != c ? c : 0, this._index = {
                        availabilityTimeComplete: null == l || l,
                        availabilityTimeOffset: S,
                        indexRange: e.indexRange,
                        indexTimeOffset: T,
                        initialization: (0, r.Z)(e.initialization) ? void 0 : {
                            url: k,
                            range: e.initialization.range
                        },
                        segmentUrlTemplate: _,
                        startNumber: e.startNumber,
                        endNumber: e.endNumber,
                        timeline: void 0 === e.timeline ? null : te(e.timeline, e.startNumber, e.endNumber),
                        timescale: b
                    }, this._scaledPeriodStart = A(g, this._index), this._scaledPeriodEnd = void 0 === v ? void 0 : A(v, this._index)
                }
                getInitSegment() {
                    return L(this._index, this._isEMSGWhitelisted)
                }
                getSegments(e, t) {
                    this._refreshTimeline(), null === this._index.timeline && (this._index.timeline = this._getTimeline());
                    const i = this._index;
                    return F({
                        segmentUrlTemplate: i.segmentUrlTemplate,
                        startNumber: i.startNumber,
                        endNumber: i.endNumber,
                        timeline: i.timeline,
                        timescale: i.timescale,
                        indexTimeOffset: i.indexTimeOffset
                    }, e, t, this._manifestBoundsCalculator, this._scaledPeriodEnd, this._isEMSGWhitelisted)
                }
                shouldRefresh() {
                    return !1
                }
                getFirstAvailablePosition() {
                    this._refreshTimeline(), null === this._index.timeline && (this._index.timeline = this._getTimeline());
                    const e = this._index.timeline;
                    return 0 === e.length ? null : M(Math.max(this._scaledPeriodStart, e[0].start), this._index)
                }
                getLastAvailablePosition() {
                    var e;
                    this._refreshTimeline(), null === this._index.timeline && (this._index.timeline = this._getTimeline());
                    const t = ie(this._index, this._manifestBoundsCalculator, this._scaledPeriodEnd);
                    if (null === t) return null;
                    return M(Math.min(t.end, null !== (e = this._scaledPeriodEnd) && void 0 !== e ? e : 1 / 0), this._index)
                }
                getEnd() {
                    var e;
                    if (this._isDynamic && !this._isLastPeriod) return;
                    if (this._refreshTimeline(), null === this._index.timeline && (this._index.timeline = this._getTimeline()), this._index.timeline.length <= 0) return null;
                    const t = this._index.timeline[this._index.timeline.length - 1];
                    return M(Math.min(R(t, null, this._scaledPeriodEnd), null !== (e = this._scaledPeriodEnd) && void 0 !== e ? e : 1 / 0), this._index)
                }
                awaitSegmentBetween(e, t) {
                    var i, n;
                    if ((0, a.ZP)(e <= t), !this._isDynamic) return !1;
                    this._refreshTimeline(), null === this._index.timeline && (this._index.timeline = this._getTimeline());
                    const s = this._index,
                        r = s.timescale,
                        o = s.timeline,
                        l = q(r),
                        c = A(t, this._index),
                        u = ie(this._index, this._manifestBoundsCalculator, this._scaledPeriodEnd);
                    if (null !== u) {
                        if (Math.min(u.end, null !== (i = this._scaledPeriodEnd) && void 0 !== i ? i : 1 / 0) + l >= Math.min(c, null !== (n = this._scaledPeriodEnd) && void 0 !== n ? n : 1 / 0)) return !1
                    }
                    const d = A(e, this._index);
                    if (o.length > 0 && null !== u && !u.isLastOfTimeline) {
                        if (d < R(o[o.length - 1], null, this._scaledPeriodEnd) + l + l) return !0
                    }
                    return !!this._isLastPeriod && (void 0 === this._scaledPeriodEnd ? c + l > this._scaledPeriodStart && void 0 : d - l < this._scaledPeriodEnd && c + l > this._scaledPeriodStart)
                }
                isSegmentStillAvailable(e) {
                    return !!e.isInit || (this._refreshTimeline(), null === this._index.timeline && (this._index.timeline = this._getTimeline()), function (e, t, i, n) {
                        const s = ie(t, i, n);
                        if (null === s) return !1;
                        for (let i = 0; i < t.timeline.length; i++) {
                            if (s.timelineIdx < i) return !1;
                            const n = t.timeline[i],
                                a = (n.start - t.indexTimeOffset) / t.timescale;
                            if (a > e.time) return !1;
                            if (a === e.time) return void 0 === n.range ? void 0 === e.range : !(0, r.Z)(e.range) && n.range[0] === e.range[0] && n.range[1] === e.range[1];
                            if (n.repeatCount >= 0 && void 0 !== n.duration) {
                                const e = (a - n.start) / n.duration - 1;
                                return e % 1 == 0 && e <= s.newRepeatCount
                            }
                        }
                        return !1
                    }(e, this._index, this._manifestBoundsCalculator, this._scaledPeriodEnd))
                }
                checkDiscontinuity(e) {
                    this._refreshTimeline();
                    let t = this._index.timeline;
                    return null === t && (t = this._getTimeline(), this._index.timeline = t), N({
                        timeline: t,
                        timescale: this._index.timescale,
                        indexTimeOffset: this._index.indexTimeOffset
                    }, e, this._scaledPeriodEnd)
                }
                canBeOutOfSyncError(e) {
                    return !!this._isDynamic && (e instanceof W.Z && e.isHttpError(404))
                }
                _replace(e) {
                    this._parseTimeline = e._parseTimeline, this._index = e._index, this._isDynamic = e._isDynamic, this._scaledPeriodStart = e._scaledPeriodStart, this._scaledPeriodEnd = e._scaledPeriodEnd, this._lastUpdate = e._lastUpdate, this._manifestBoundsCalculator = e._manifestBoundsCalculator, this._isLastPeriod = e._isLastPeriod
                }
                _update(e) {
                    null === this._index.timeline && (this._index.timeline = this._getTimeline()), null === e._index.timeline && (e._index.timeline = e._getTimeline());
                    X(this._index.timeline, e._index.timeline) && (this._index.startNumber = e._index.startNumber), this._index.availabilityTimeOffset = e._index.availabilityTimeOffset, this._index.availabilityTimeComplete = e._index.availabilityTimeComplete, this._index.endNumber = e._index.endNumber, this._isDynamic = e._isDynamic, this._scaledPeriodStart = e._scaledPeriodStart, this._scaledPeriodEnd = e._scaledPeriodEnd, this._lastUpdate = e._lastUpdate, this._isLastPeriod = e._isLastPeriod
                }
                isStillAwaitingFutureSegments() {
                    var e;
                    if (!this._isDynamic) return !1;
                    this._refreshTimeline(), null === this._index.timeline && (this._index.timeline = this._getTimeline());
                    const t = this._index.timeline;
                    if (0 === t.length) {
                        if (void 0 !== this._scaledPeriodEnd) {
                            const e = this._manifestBoundsCalculator.getEstimatedLiveEdge();
                            if (void 0 !== e && A(e, this._index) > this._scaledPeriodEnd) return !1
                        }
                        return this._isLastPeriod
                    }
                    const i = q(this._index.timescale),
                        n = ie(this._index, this._manifestBoundsCalculator, this._scaledPeriodEnd);
                    if (null !== n && !n.isLastOfTimeline) {
                        const t = Math.min(n.end, null !== (e = this._scaledPeriodEnd) && void 0 !== e ? e : 1 / 0);
                        return !(void 0 !== this._scaledPeriodEnd && t + i >= this._scaledPeriodEnd)
                    }
                    if (!this._isLastPeriod) return !1;
                    if (void 0 === this._scaledPeriodEnd) return !0;
                    return R(t[t.length - 1], null, this._scaledPeriodEnd) + i < this._scaledPeriodEnd
                }
                isInitialized() {
                    return !0
                }
                initialize() {
                    l.Z.error("A `TimelineRepresentationIndex` does not need to be initialized")
                }
                addPredictedSegments() {
                    l.Z.warn("Cannot add predicted segments to a `TimelineRepresentationIndex`")
                }
                static isTimelineIndexArgument(e) {
                    return "function" == typeof e.timelineParser || Array.isArray(e.timeline)
                }
                _refreshTimeline() {
                    if (null === this._index.timeline && (this._index.timeline = this._getTimeline()), !this._isDynamic) return;
                    const e = this._manifestBoundsCalculator.getEstimatedMinimumSegmentTime();
                    if ((0, r.Z)(e)) return;
                    const t = A(e, this._index),
                        i = $(this._index.timeline, t);
                    void 0 !== this._index.startNumber ? this._index.startNumber += i : void 0 !== this._index.endNumber && (this._index.startNumber = i + 1)
                }
                _getTimeline() {
                    if (null === this._parseTimeline) return null !== this._index.timeline ? this._index.timeline : (l.Z.error("DASH: Timeline already lazily parsed."), []);
                    const e = this._parseTimeline();
                    this._parseTimeline = null;
                    const t = o.Z.getCurrent().MIN_DASH_S_ELEMENTS_TO_PARSE_UNSAFELY;
                    if (null === this._unsafelyBaseOnPreviousIndex || e.length < t) return te(Y(e), this._index.startNumber, this._index.endNumber);
                    let i;
                    return null === this._unsafelyBaseOnPreviousIndex._index.timeline ? (i = this._unsafelyBaseOnPreviousIndex._getTimeline(), this._unsafelyBaseOnPreviousIndex._index.timeline = i) : i = this._unsafelyBaseOnPreviousIndex._index.timeline, this._unsafelyBaseOnPreviousIndex = null, te(J(e, i), this._index.startNumber, this._index.endNumber)
                }
            }

            function te(e, t, i) {
                if (void 0 === i) return e;
                let n = null != t ? t : 1;
                for (let t = 0; t < e.length; t++) {
                    const s = e[t];
                    if (n += s.repeatCount + 1, n > i) {
                        if (n === i + 1) return e.slice(0, t + 1); {
                            const a = e.slice(0, t),
                                r = Object.assign({}, s),
                                o = n - s.repeatCount - 1;
                            return r.repeatCount = Math.max(0, i - o), a.push(r), a
                        }
                    }
                }
                return e
            }

            function ie(e, t, i) {
                if (e.timeline.length <= 0) return null;
                if (e.availabilityTimeOffset === 1 / 0) {
                    const t = e.timeline.length - 1,
                        n = e.timeline[t];
                    return {
                        isLastOfTimeline: !0,
                        timelineIdx: t,
                        newRepeatCount: n.repeatCount,
                        end: R(n, null, i)
                    }
                }
                const n = t.getEstimatedMaximumPosition(e.availabilityTimeOffset);
                if (void 0 === n) {
                    const t = e.timeline.length - 1,
                        n = e.timeline[t];
                    return {
                        isLastOfTimeline: !0,
                        timelineIdx: t,
                        newRepeatCount: n.repeatCount,
                        end: R(n, null, i)
                    }
                }
                for (let t = e.timeline.length - 1; t >= e.timeline.length; t--) {
                    const s = e.timeline[t],
                        r = s.start + s.duration;
                    if (M(r, e) <= n) {
                        if (M(R(s, e.timeline[t + 1], i), e) <= n) return {
                            isLastOfTimeline: t === e.timeline.length - 1,
                            timelineIdx: t,
                            newRepeatCount: s.repeatCount,
                            end: r
                        }; {
                            const i = A(n, e) - s.start,
                                r = Math.floor(i / s.duration);
                            return (0, a.ZP)(r >= 1), {
                                isLastOfTimeline: !1,
                                timelineIdx: t,
                                newRepeatCount: r - 1,
                                end: s.start + r * s.duration
                            }
                        }
                    }
                }
                return null
            }
            const ne = ee;
            class se {
                constructor(e, t) {
                    var i, n, s;
                    const a = t.availabilityTimeOffset,
                        o = t.manifestBoundsCalculator,
                        l = t.isDynamic,
                        c = t.periodEnd,
                        u = t.periodStart,
                        d = t.representationId,
                        h = t.representationBitrate,
                        m = t.isEMSGWhitelisted,
                        f = null !== (i = e.timescale) && void 0 !== i ? i : 1;
                    this._availabilityTimeOffset = a, this._manifestBoundsCalculator = o;
                    const p = null !== (n = e.presentationTimeOffset) && void 0 !== n ? n : 0,
                        g = p - u * f;
                    if (void 0 === e.duration) throw new Error("Invalid SegmentTemplate: no duration");
                    const v = void 0 === (null === (s = e.initialization) || void 0 === s ? void 0 : s.media) ? null : O(e.initialization.media, d, h),
                        y = void 0 === e.media ? null : O(e.media, d, h);
                    this._index = {
                        duration: e.duration,
                        timescale: f,
                        indexRange: e.indexRange,
                        indexTimeOffset: g,
                        initialization: (0, r.Z)(e.initialization) ? void 0 : {
                            url: v,
                            range: e.initialization.range
                        },
                        url: y,
                        presentationTimeOffset: p,
                        startNumber: e.startNumber,
                        endNumber: e.endNumber
                    }, this._isDynamic = l, this._periodStart = u, this._scaledRelativePeriodEnd = void 0 === c ? void 0 : (c - u) * f, this._isEMSGWhitelisted = m
                }
                getInitSegment() {
                    return L(this._index, this._isEMSGWhitelisted)
                }
                getSegments(e, t) {
                    const i = this._index,
                        n = i.duration,
                        s = i.startNumber,
                        a = i.endNumber,
                        o = i.timescale,
                        l = i.url,
                        c = this._periodStart * o,
                        u = this._scaledRelativePeriodEnd,
                        d = e * o - c,
                        h = (e + t) * o - c,
                        m = this._getFirstSegmentStart(),
                        f = this._getLastSegmentStart();
                    if ((0, r.Z)(m) || (0, r.Z)(f)) return [];
                    const p = Math.max(m, d),
                        g = Math.min(f, h);
                    if (g + n <= p) return [];
                    const v = [],
                        y = null != s ? s : 1;
                    let b = Math.floor(p / n);
                    for (let e = b * n; e <= g; e += n) {
                        const t = b + y;
                        if (void 0 !== a && t > a) return v;
                        const s = !(0, r.Z)(u) && e + n > u ? u - e : n,
                            d = e + c,
                            h = e + this._index.presentationTimeOffset,
                            m = null === l ? null : z(h, t)(l),
                            f = {
                                id: String(t),
                                number: t,
                                time: d / o,
                                end: (d + s) / o,
                                duration: s / o,
                                timescale: 1,
                                isInit: !1,
                                scaledDuration: s / o,
                                url: m,
                                timestampOffset: -i.indexTimeOffset / o,
                                complete: !0,
                                privateInfos: {
                                    isEMSGWhitelisted: this._isEMSGWhitelisted
                                }
                            };
                        v.push(f), b++
                    }
                    return v
                }
                getFirstAvailablePosition() {
                    const e = this._getFirstSegmentStart();
                    return (0, r.Z)(e) ? e : e / this._index.timescale + this._periodStart
                }
                getLastAvailablePosition() {
                    const e = this._getLastSegmentStart();
                    if ((0, r.Z)(e)) return e;
                    const t = this._estimateRelativeScaledEnd();
                    return Math.min(e + this._index.duration, null != t ? t : 1 / 0) / this._index.timescale + this._periodStart
                }
                getEnd() {
                    if (!this._isDynamic) return this.getLastAvailablePosition();
                    const e = this._estimateRelativeScaledEnd();
                    if (void 0 === e) return;
                    const t = this._index.timescale;
                    return (e + this._periodStart * t) / t
                }
                awaitSegmentBetween(e, t) {
                    if ((0, a.ZP)(e <= t), !this._isDynamic) return !1;
                    const i = this._index.timescale,
                        n = q(i),
                        s = this._periodStart * i,
                        o = e * i - s,
                        l = t * i - s,
                        c = this._getLastSegmentStart();
                    if ((0, r.Z)(c)) {
                        const e = this._estimateRelativeScaledEnd();
                        return void 0 === e ? l + n >= 0 : l + n >= 0 && o < e - n
                    }
                    const u = c + this._index.duration,
                        d = this._estimateRelativeScaledEnd();
                    return void 0 === d ? l > u - n : l > u - n && o < d - n
                }
                shouldRefresh() {
                    return !1
                }
                checkDiscontinuity() {
                    return null
                }
                isSegmentStillAvailable(e) {
                    if (e.isInit) return !0;
                    const t = this.getSegments(e.time, .1);
                    return 0 !== t.length && (t[0].time === e.time && t[0].end === e.end && t[0].number === e.number)
                }
                canBeOutOfSyncError() {
                    return !1
                }
                isStillAwaitingFutureSegments() {
                    if (!this._isDynamic) return !1;
                    const e = this._estimateRelativeScaledEnd();
                    if (void 0 === e) return !0;
                    const t = this._index.timescale,
                        i = this._getLastSegmentStart();
                    if ((0, r.Z)(i)) return !0;
                    return i + this._index.duration + q(t) < e
                }
                isInitialized() {
                    return !0
                }
                initialize() {
                    l.Z.error("A `TemplateRepresentationIndex` does not need to be initialized")
                }
                addPredictedSegments() {
                    l.Z.warn("Cannot add predicted segments to a `TemplateRepresentationIndex`")
                }
                _replace(e) {
                    this._index = e._index, this._isDynamic = e._isDynamic, this._periodStart = e._periodStart, this._scaledRelativePeriodEnd = e._scaledRelativePeriodEnd, this._manifestBoundsCalculator = e._manifestBoundsCalculator
                }
                _update(e) {
                    this._replace(e)
                }
                _getFirstSegmentStart() {
                    var e;
                    if (!this._isDynamic) return 0;
                    if (0 === this._scaledRelativePeriodEnd || void 0 === this._scaledRelativePeriodEnd) {
                        const t = this._manifestBoundsCalculator.getEstimatedMaximumPosition(null !== (e = this._availabilityTimeOffset) && void 0 !== e ? e : 0);
                        if (void 0 !== t && t < this._periodStart) return null
                    }
                    const t = this._index,
                        i = t.duration,
                        n = t.timescale,
                        s = this._manifestBoundsCalculator.getEstimatedMinimumSegmentTime();
                    if (void 0 === s) return;
                    const a = s > this._periodStart ? (s - this._periodStart) * n : 0;
                    return Math.floor(a / i) * i
                }
                _getLastSegmentStart() {
                    var e, t;
                    const i = this._index,
                        n = i.duration,
                        s = i.timescale,
                        a = i.endNumber,
                        r = i.startNumber,
                        l = void 0 === r ? 1 : r;
                    if (this._isDynamic) {
                        const t = this._manifestBoundsCalculator.getEstimatedLiveEdge();
                        if (void 0 !== t && void 0 !== this._scaledRelativePeriodEnd && this._scaledRelativePeriodEnd < t - this._periodStart * this._index.timescale) {
                            let e = Math.ceil(this._scaledRelativePeriodEnd / n);
                            return void 0 !== a && a - l + 1 < e && (e = a - l + 1), (e - 1) * n
                        }
                        const i = this._manifestBoundsCalculator.getEstimatedMaximumPosition(null !== (e = this._availabilityTimeOffset) && void 0 !== e ? e : 0);
                        if (void 0 === i) return;
                        const r = (i - this._periodStart) * s;
                        if (r < 0) return null;
                        let o = Math.floor(r / n);
                        return void 0 !== a && a - l + 1 < o && (o = a - l + 1), o <= 0 ? null : (o - 1) * n
                    } {
                        const e = null !== (t = this._scaledRelativePeriodEnd) && void 0 !== t ? t : 0;
                        let i = Math.ceil(e / n);
                        void 0 !== a && a - l + 1 < i && (i = a - l + 1);
                        const r = (i - 1) * n,
                            c = o.Z.getCurrent().MINIMUM_SEGMENT_SIZE * s;
                        return void 0 !== a || e - r > c || i < 2 ? r : (i - 2) * n
                    }
                }
                _estimateRelativeScaledEnd() {
                    var e, t;
                    if (void 0 !== this._index.endNumber) {
                        const i = this._index.endNumber - (null !== (e = this._index.startNumber) && void 0 !== e ? e : 1) + 1;
                        return Math.max(Math.min(i * this._index.duration, null !== (t = this._scaledRelativePeriodEnd) && void 0 !== t ? t : 1 / 0), 0)
                    }
                    if (void 0 !== this._scaledRelativePeriodEnd) return Math.max(this._scaledRelativePeriodEnd, 0)
                }
            }

            function ae(e, t) {
                var i, n;
                const s = t.availabilityTimeOffset,
                    a = t.manifestBoundsCalculator,
                    r = t.isDynamic,
                    o = t.end,
                    l = t.start,
                    c = t.receivedTime,
                    u = t.unsafelyBaseOnPreviousRepresentation,
                    d = t.inbandEventStreams,
                    h = {
                        availabilityTimeComplete: void 0,
                        availabilityTimeOffset: s,
                        unsafelyBaseOnPreviousRepresentation: u,
                        isEMSGWhitelisted: e => void 0 !== d && d.some((({
                            schemeIdUri: t
                        }) => t === e.schemeIdUri)),
                        isLastPeriod: t.isLastPeriod,
                        manifestBoundsCalculator: a,
                        isDynamic: r,
                        periodEnd: o,
                        periodStart: l,
                        receivedTime: c,
                        representationBitrate: e.attributes.bitrate,
                        representationId: e.attributes.id
                    };
                let m;
                if (void 0 !== e.children.segmentBase) {
                    const t = e.children.segmentBase;
                    m = new V(t, h)
                } else if (void 0 !== e.children.segmentList) {
                    const t = e.children.segmentList;
                    m = new H(t, h)
                } else if (void 0 !== e.children.segmentTemplate || t.parentSegmentTemplates.length > 0) {
                    const s = t.parentSegmentTemplates.slice(),
                        a = e.children.segmentTemplate;
                    void 0 !== a && s.push(a);
                    const r = (0, Z.Z)({}, ...s);
                    void 0 === r.availabilityTimeOffset && void 0 === t.availabilityTimeOffset || (h.availabilityTimeOffset = (null !== (i = r.availabilityTimeOffset) && void 0 !== i ? i : 0) + (null !== (n = t.availabilityTimeOffset) && void 0 !== n ? n : 0)), m = ne.isTimelineIndexArgument(r) ? new ne(r, h) : new se(r, h)
                } else {
                    const e = t.adaptation.children;
                    if (void 0 !== e.segmentBase) {
                        const t = e.segmentBase;
                        m = new V(t, h)
                    } else if (void 0 !== e.segmentList) {
                        const t = e.segmentList;
                        m = new H(t, h)
                    } else m = new se({
                        duration: Number.MAX_VALUE,
                        timescale: 1,
                        startNumber: 0,
                        media: ""
                    }, h)
                }
                return m
            }

            function re(e, t) {
                var i;
                if (0 === t.length) return e;
                const n = t.map((e => ({
                    url: e.value
                })));
                if (0 === e.length) return n;
                const s = [];
                for (let t = 0; t < e.length; t++) {
                    const a = e[t];
                    for (let e = 0; e < n.length; e++) {
                        const t = n[e],
                            r = (0, d.Z)(a.url, t.url);
                        s.push({
                            url: r,
                            serviceLocation: null !== (i = t.serviceLocation) && void 0 !== i ? i : a.serviceLocation
                        })
                    }
                }
                return s
            }

            function oe(e, t) {
                const i = [];
                if (void 0 !== e.children.inbandEventStreams && i.push(...e.children.inbandEventStreams), void 0 !== t.children.inbandEventStreams && i.push(...t.children.inbandEventStreams), 0 !== i.length) return i
            }

            function le({
                adaptationProfiles: e,
                essentialProperties: t,
                supplementalProperties: i,
                manifestProfiles: n,
                codecs: s
            }) {
                if (-1 !== ((null != e ? e : "") + (null != n ? n : "")).indexOf("http://dashif.org/guidelines/dash-if-uhd#hevc-hdr-pq10") && ("hvc1.2.4.L153.B0" === s || "hev1.2.4.L153.B0" === s)) return {
                    colorDepth: 10,
                    eotf: "pq",
                    colorSpace: "rec2020"
                };
                const a = (0, c.Z)([...null != t ? t : [], ...null != i ? i : []], (e => "urn:mpeg:mpegB:cicp:TransferCharacteristics" === e.schemeIdUri));
                if (void 0 !== a) switch (a.value) {
                case "15":
                    return;
                case "16":
                    return {
                        eotf: "pq"
                    };
                case "18":
                    return {
                        eotf: "hlg"
                    }
                }
                return void 0 !== s && /^vp(08|09|10)/.exec(s) ? function (e) {
                    const t = e.split("."),
                        i = t[0],
                        n = (t[1], t[2], t[3]),
                        s = (t[4], t[5]),
                        a = t[6],
                        r = t[7];
                    if ("vp08" !== i && "vp09" !== i && "vp10" !== i) return;
                    let o, l, c;
                    return (void 0 !== n && "10" === n || "12" === n) && (o = parseInt(n, 10)), void 0 !== a && ("16" === a ? l = "pq" : "18" === a && (l = "hlg")), void 0 !== s && void 0 !== r && "09" === s && "09" === r && (c = "rec2020"), void 0 !== o && void 0 !== l ? {
                        colorDepth: o,
                        eotf: l,
                        colorSpace: c
                    } : void 0
                }(s) : void 0
            }

            function ce(e, t, i) {
                var n, s, a, r, o;
                const u = [];
                for (const h of e) {
                    let e = void 0 !== h.attributes.id ? h.attributes.id : String(h.attributes.bitrate) + (void 0 !== h.attributes.height ? `-${h.attributes.height}` : "") + (void 0 !== h.attributes.width ? `-${h.attributes.width}` : "") + (void 0 !== h.attributes.mimeType ? `-${h.attributes.mimeType}` : "") + (void 0 !== h.attributes.codecs ? `-${h.attributes.codecs}` : "");
                    for (; u.some((t => t.id === e));) e += "-dup";
                    const m = null !== (s = null === (n = i.unsafelyBaseOnPreviousAdaptation) || void 0 === n ? void 0 : n.getRepresentation(e)) && void 0 !== s ? s : null,
                        f = oe(h, t),
                        p = null !== (a = h.attributes.availabilityTimeComplete) && void 0 !== a ? a : i.availabilityTimeComplete;
                    let g;
                    void 0 === h.attributes.availabilityTimeOffset && void 0 === i.availabilityTimeOffset || (g = (null !== (r = h.attributes.availabilityTimeOffset) && void 0 !== r ? r : 0) + (null !== (o = i.availabilityTimeOffset) && void 0 !== o ? o : 0));
                    const v = ae(h, (0, Z.Z)({}, i, {
                        availabilityTimeOffset: g,
                        availabilityTimeComplete: p,
                        unsafelyBaseOnPreviousRepresentation: m,
                        adaptation: t,
                        inbandEventStreams: f
                    }));
                    let y;
                    void 0 === h.attributes.bitrate ? (l.Z.warn("DASH: No usable bitrate found in the Representation."), y = 0) : y = h.attributes.bitrate;
                    const b = re(i.baseURLs, h.children.baseURLs),
                        T = {
                            bitrate: y,
                            cdnMetadata: 0 === b.length ? [{
                                baseUrl: "",
                                id: void 0
                            }] : b.map((e => ({
                                baseUrl: e.url,
                                id: e.serviceLocation
                            }))),
                            index: v,
                            id: e
                        };
                    let k, _;
                    void 0 !== h.children.supplementalProperties && (0, c.Z)(h.children.supplementalProperties, (e => "tag:dolby.com,2018:dash:EC3_ExtensionType:2018" === e.schemeIdUri && "JOC" === e.value)) && (T.isSpatialAudio = !0), void 0 !== h.attributes.codecs ? k = h.attributes.codecs : void 0 !== t.attributes.codecs && (k = t.attributes.codecs), void 0 !== k && (k = "mp4a.40.02" === k ? "mp4a.40.2" : k, T.codecs = k), void 0 !== h.attributes.supplementalCodecs ? _ = h.attributes.supplementalCodecs : void 0 !== t.attributes.supplementalCodecs && (_ = t.attributes.supplementalCodecs), void 0 !== _ && (T.supplementalCodecs = (d = _, (0, E.Z)(d) ? d.trim().replace(I, ", ") : "")), void 0 !== h.attributes.frameRate ? T.frameRate = h.attributes.frameRate : void 0 !== t.attributes.frameRate && (T.frameRate = t.attributes.frameRate), void 0 !== h.attributes.height ? T.height = h.attributes.height : void 0 !== t.attributes.height && (T.height = t.attributes.height), void 0 !== h.attributes.mimeType ? T.mimeType = h.attributes.mimeType : void 0 !== t.attributes.mimeType && (T.mimeType = t.attributes.mimeType), void 0 !== h.attributes.width ? T.width = h.attributes.width : void 0 !== t.attributes.width && (T.width = t.attributes.width);
                    const S = void 0 !== t.children.contentProtections ? t.children.contentProtections : [];
                    if (void 0 !== h.children.contentProtections && S.push(...h.children.contentProtections), S.length > 0) {
                        const e = S.reduce(((e, t) => {
                            let i;
                            if (void 0 !== t.attributes.schemeIdUri && "urn:uuid:" === t.attributes.schemeIdUri.substring(0, 9) && (i = t.attributes.schemeIdUri.substring(9).replace(/-/g, "").toLowerCase()), void 0 !== t.attributes.keyId && t.attributes.keyId.length > 0) {
                                const n = {
                                    keyId: t.attributes.keyId,
                                    systemId: i
                                };
                                void 0 === e.keyIds ? e.keyIds = [n] : e.keyIds.push(n)
                            }
                            if (void 0 !== i) {
                                const n = t.children.cencPssh,
                                    s = [];
                                for (const e of n) s.push({
                                    systemId: i,
                                    data: e
                                });
                                if (s.length > 0) {
                                    const t = (0, c.Z)(e.initData, (e => "cenc" === e.type));
                                    void 0 === t ? e.initData.push({
                                        type: "cenc",
                                        values: s
                                    }) : t.values.push(...s)
                                }
                            }
                            return e
                        }), {
                            keyIds: void 0,
                            initData: []
                        });
                        (Object.keys(e.initData).length > 0 || void 0 !== e.keyIds && e.keyIds.length > 0) && (T.contentProtections = e)
                    }
                    T.hdrInfo = le({
                        adaptationProfiles: t.attributes.profiles,
                        supplementalProperties: t.children.supplementalProperties,
                        essentialProperties: t.children.essentialProperties,
                        manifestProfiles: i.manifestProfiles,
                        codecs: k
                    }), u.push(T)
                }
                var d;
                return u
            }

            function ue(e) {
                if (void 0 === e) return !1;
                const t = "urn:tva:metadata:cs:AudioPurposeCS:2007" === e.schemeIdUri && "1" === e.value,
                    i = "urn:mpeg:dash:role:2011" === e.schemeIdUri && "description" === e.value;
                return t || i
            }

            function de(e, t) {
                if (void 0 !== e) {
                    if (e.some((e => "urn:tva:metadata:cs:AudioPurposeCS:2007" === e.schemeIdUri && "2" === e.value))) return !0
                }
                if (void 0 !== t) {
                    if (t.some((e => "urn:mpeg:dash:role:2011" === e.schemeIdUri && "caption" === e.value))) return !0
                }
                return !1
            }

            function he(e) {
                return void 0 !== e && ("urn:mpeg:dash:role:2011" === e.schemeIdUri && "sign" === e.value)
            }

            function me(e, t) {
                if ((0, E.Z)(e.attributes.id)) return e.attributes.id;
                const i = t.isClosedCaption,
                    n = t.isForcedSubtitle,
                    s = t.isAudioDescription,
                    a = t.isSignInterpreted,
                    r = t.isTrickModeTrack;
                let o = t.type;
                return (0, E.Z)(e.attributes.language) && (o += `-${e.attributes.language}`), !0 === i && (o += "-cc"), !0 === n && (o += "-cc"), !0 === s && (o += "-ad"), !0 === a && (o += "-si"), r && (o += "-trickMode"), (0, E.Z)(e.attributes.contentType) && (o += `-${e.attributes.contentType}`), (0, E.Z)(e.attributes.codecs) && (o += `-${e.attributes.codecs}`), (0, E.Z)(e.attributes.mimeType) && (o += `-${e.attributes.mimeType}`), void 0 !== e.attributes.frameRate && (o += `-${String(e.attributes.frameRate)}`), o
            }

            function fe(e) {
                if (!(0, r.Z)(e.children.supplementalProperties)) {
                    const t = e.children.supplementalProperties;
                    for (const e of t)
                        if ("urn:mpeg:dash:adaptation-set-switching:2016" === e.schemeIdUri && !(0, r.Z)(e.value)) return e.value.split(",").map((e => e.trim())).filter((e => e))
                }
                return []
            }

            function pe(e, t) {
                var i, n, s, a, o, u, d;
                const h = {
                        video: [],
                        audio: [],
                        text: []
                    },
                    m = [],
                    f = {},
                    p = [];
                for (let g = 0; g < e.length; g++) {
                    const v = e[g],
                        y = v.children,
                        b = y.essentialProperties,
                        T = y.roles,
                        k = y.label,
                        _ = Array.isArray(T) && T.some((e => "main" === e.value)) && T.some((e => "urn:mpeg:dash:role:2011" === e.schemeIdUri)),
                        D = v.children.representations,
                        x = null !== (i = v.attributes.availabilityTimeComplete) && void 0 !== i ? i : t.availabilityTimeComplete;
                    let Z;
                    void 0 === v.attributes.availabilityTimeOffset && void 0 === t.availabilityTimeOffset || (Z = (null !== (n = v.attributes.availabilityTimeOffset) && void 0 !== n ? n : 0) + (null !== (s = t.availabilityTimeOffset) && void 0 !== s ? s : 0));
                    const I = v.attributes.mimeType,
                        C = v.attributes.codecs,
                        R = P(D, (0, E.Z)(I) ? I : null, (0, E.Z)(C) ? C : null, (0, r.Z)(y.roles) ? null : y.roles);
                    if (void 0 === R) continue;
                    const A = null !== (a = v.attributes.selectionPriority) && void 0 !== a ? a : 1,
                        M = v.attributes.id,
                        N = fe(v),
                        L = [];
                    void 0 !== t.segmentTemplate && L.push(t.segmentTemplate), void 0 !== v.children.segmentTemplate && L.push(v.children.segmentTemplate);
                    const U = {
                            availabilityTimeComplete: x,
                            availabilityTimeOffset: Z,
                            baseURLs: re(t.baseURLs, y.baseURLs),
                            manifestBoundsCalculator: t.manifestBoundsCalculator,
                            end: t.end,
                            isDynamic: t.isDynamic,
                            isLastPeriod: t.isLastPeriod,
                            manifestProfiles: t.manifestProfiles,
                            parentSegmentTemplates: L,
                            receivedTime: t.receivedTime,
                            start: t.start,
                            unsafelyBaseOnPreviousAdaptation: null
                        },
                        O = Array.isArray(b) ? (0, c.Z)(b, (e => "http://dashif.org/guidelines/trickmode" === e.schemeIdUri)) : void 0,
                        z = null === (o = null == O ? void 0 : O.value) || void 0 === o ? void 0 : o.split(" "),
                        K = void 0 !== z,
                        F = y.accessibilities;
                    let B, V, H, W, $;
                    void 0 !== T && T.some((e => "dub" === e.value)) && (B = !0), V = "text" === R && de(F, T), "text" === R && void 0 !== T && T.some((e => "forced-subtitle" === e.value || "forced_subtitle" === e.value)) && (H = !0), "audio" !== R ? W = !1 : void 0 !== F && (W = F.some(ue)), "video" !== R ? $ = !1 : void 0 !== F && ($ = F.some(he));
                    let G = me(v, {
                        isAudioDescription: W,
                        isForcedSubtitle: H,
                        isClosedCaption: V,
                        isSignInterpreted: $,
                        isTrickModeTrack: K,
                        type: R
                    });
                    for (;
                        (0, w.Z)(p, G);) G += "-dup";
                    const X = G;
                    p.push(G), U.unsafelyBaseOnPreviousAdaptation = null !== (d = null === (u = t.unsafelyBaseOnPreviousPeriod) || void 0 === u ? void 0 : u.getAdaptation(G)) && void 0 !== d ? d : null;
                    const q = {
                        id: G,
                        representations: ce(D, v, U),
                        type: R,
                        isTrickModeTrack: K
                    };
                    if ((0, r.Z)(v.attributes.language) || (q.language = v.attributes.language), (0, r.Z)(V) || (q.closedCaption = V), (0, r.Z)(W) || (q.audioDescription = W), !0 === B && (q.isDub = !0), void 0 !== H && (q.forcedSubtitles = H), !0 === $ && (q.isSignInterpreted = !0), void 0 !== k && (q.label = k), void 0 !== z) m.push({
                        adaptation: q,
                        trickModeAttachedAdaptationIds: z
                    });
                    else {
                        let e = -1;
                        for (const t of N) {
                            const i = f[t];
                            if (void 0 !== i && i.newID !== X && (0, w.Z)(i.adaptationSetSwitchingIDs, M)) {
                                e = (0, S.Z)(h[R], (e => e[0].id === t));
                                const i = h[R][e];
                                if (void 0 !== i && i[0].audioDescription === q.audioDescription && i[0].closedCaption === q.closedCaption && i[0].language === q.language) {
                                    l.Z.info('DASH Parser: merging "switchable" AdaptationSets', M, t), i[0].representations.push(...q.representations), i[1] = {
                                        priority: Math.max(A, i[1].priority),
                                        isMainAdaptation: _ || i[1].isMainAdaptation,
                                        indexInMpd: Math.min(g, i[1].indexInMpd)
                                    };
                                    break
                                }
                            }
                        }
                        e < 0 && h[R].push([q, {
                            priority: A,
                            isMainAdaptation: _,
                            indexInMpd: g
                        }])
                    }!(0, r.Z)(M) && (0, r.Z)(f[M]) && (f[M] = {
                        newID: X,
                        adaptationSetSwitchingIDs: N
                    })
                }
                const g = _.rX.reduce(((e, t) => {
                    const i = h[t];
                    return i.length > 0 && (i.sort(ge), e[t] = i.map((([e]) => e))), e
                }), {});
                return h.video.sort(ge), D(g, m), g
            }

            function ge(e, t) {
                const i = t[1].priority - e[1].priority;
                return 0 !== i ? i : e[1].isMainAdaptation !== t[1].isMainAdaptation ? e[1].isMainAdaptation ? -1 : 1 : e[1].indexInMpd - t[1].indexInMpd
            }
            const ve = (0, y.Z)();

            function ye(e, t) {
                var i, n, s, a;
                const o = [],
                    c = function (e, t) {
                        const i = [];
                        return e.forEach(((n, s) => {
                            let a, o;
                            if ((0, r.Z)(n.attributes.start))
                                if (0 === s) a = !t.isDynamic || (0, r.Z)(t.availabilityStartTime) ? 0 : t.availabilityStartTime;
                                else {
                                    const e = i[i.length - 1];
                                    if ((0, r.Z)(e) || (0, r.Z)(e.periodEnd)) throw new Error("Missing start time when parsing periods.");
                                    a = e.periodEnd
                                }
                            else a = n.attributes.start;
                            const l = e[s + 1];
                            (0, r.Z)(n.attributes.duration) ? s === e.length - 1 ? o = t.duration : (0, r.Z)(l.attributes.start) || (o = l.attributes.start - a): o = n.attributes.duration;
                            const c = (0, r.Z)(o) ? void 0 : a + o;
                            i.push({
                                periodStart: a,
                                periodDuration: o,
                                periodEnd: c
                            })
                        })), i
                    }(e, t);
                if (c.length !== e.length) throw new Error("MPD parsing error: the time information are incoherent.");
                const d = t.isDynamic,
                    h = t.manifestBoundsCalculator;
                d || (0, r.Z)(t.duration) || h.setLastPosition(t.duration);
                for (let m = e.length - 1; m >= 0; m--) {
                    const f = m === e.length - 1,
                        p = e[m],
                        g = t.xlinkInfos.get(p),
                        v = re(t.baseURLs, p.children.baseURLs),
                        y = c[m],
                        b = y.periodStart,
                        T = y.periodDuration,
                        k = y.periodEnd;
                    let _;
                    for ((0, r.Z)(p.attributes.id) ? (l.Z.warn("DASH: No usable id found in the Period. Generating one."), _ = "gen-dash-period-" + ve()) : _ = p.attributes.id; o.some((e => e.id === _));) _ += "-dup";
                    const S = void 0 !== g ? g.receivedTime : t.receivedTime,
                        w = null !== (n = null === (i = t.unsafelyBaseOnPreviousManifest) || void 0 === i ? void 0 : i.getPeriod(_)) && void 0 !== n ? n : null,
                        E = {
                            availabilityTimeComplete: p.attributes.availabilityTimeComplete,
                            availabilityTimeOffset: p.attributes.availabilityTimeOffset,
                            baseURLs: v,
                            manifestBoundsCalculator: h,
                            end: k,
                            isDynamic: d,
                            isLastPeriod: f,
                            manifestProfiles: t.manifestProfiles,
                            receivedTime: S,
                            segmentTemplate: p.children.segmentTemplate,
                            start: b,
                            unsafelyBaseOnPreviousPeriod: w
                        },
                        D = pe(p.children.adaptations, E),
                        x = (null !== (s = t.xmlNamespaces) && void 0 !== s ? s : []).concat(null !== (a = p.attributes.namespaces) && void 0 !== a ? a : []),
                        P = ke(p.children.eventStreams, b, x),
                        Z = {
                            id: _,
                            start: b,
                            end: k,
                            duration: T,
                            adaptations: D,
                            streamEvents: P
                        };
                    if (o.unshift(Z), !h.lastPositionIsKnown()) {
                        const e = Te(D);
                        if (d)
                            if ("number" == typeof e) {
                                const t = (0, u.Z)() / 1e3;
                                h.setLastPosition(e, t)
                            } else {
                                const e = be(t, b);
                                if (void 0 !== e) {
                                    const t = e[0],
                                        i = e[1];
                                    h.setLastPosition(t, i)
                                }
                            }
                        else "number" == typeof e && h.setLastPosition(e)
                    }
                }
                if (t.isDynamic && !h.lastPositionIsKnown()) {
                    const e = be(t, 0);
                    if (void 0 !== e) {
                        const t = e[0],
                            i = e[1];
                        h.setLastPosition(t, i)
                    }
                }
                return function (e) {
                    if (0 === e.length) return [];
                    const t = [e[0]];
                    for (let i = 1; i < e.length; i++) {
                        const n = e[i];
                        let s = t[t.length - 1];
                        for (;
                            (void 0 === s.duration || s.start + s.duration > n.start) && (l.Z.warn("DASH: Updating overlapping Periods.", null == s ? void 0 : s.start, n.start), s.duration = n.start - s.start, s.end = n.start, !(s.duration > 0)) && (t.pop(), 0 !== t.length);) s = t[t.length - 1];
                        t.push(n)
                    }
                    return t
                }(o)
            }

            function be(e, t) {
                if ((0, r.Z)(e.clockOffset)) {
                    const i = Date.now() / 1e3;
                    if (i >= t) {
                        l.Z.warn("DASH Parser: no clock synchronization mechanism found. Using the system clock instead.");
                        return [i - e.availabilityStartTime, (0, u.Z)() / 1e3]
                    }
                } else {
                    const i = e.clockOffset / 1e3 - e.availabilityStartTime,
                        n = (0, u.Z)() / 1e3,
                        s = n + i;
                    if (s >= t) return [s, n]
                }
            }

            function Te(e) {
                let t = null,
                    i = !0;
                const n = v((0, T.Z)(e).filter((e => !(0, r.Z)(e))), (e => e));
                for (const e of n) {
                    const n = e.representations;
                    for (const e of n) {
                        const n = e.index.getLastAvailablePosition();
                        null !== n && (i = !1, "number" == typeof n && (t = (0, r.Z)(t) ? n : Math.max(t, n)))
                    }
                }
                return (0, r.Z)(t) ? i ? null : void 0 : t
            }

            function ke(e, t, i) {
                var n, s;
                const a = [];
                for (const r of e) {
                    const e = r.attributes,
                        o = e.schemeIdUri,
                        c = void 0 === o ? "" : o,
                        u = e.timescale,
                        d = void 0 === u ? 1 : u,
                        h = i.concat(null !== (n = r.attributes.namespaces) && void 0 !== n ? n : []);
                    for (const e of r.children.events)
                        if (void 0 !== e.eventStreamData) {
                            const i = (null !== (s = e.presentationTime) && void 0 !== s ? s : 0) / d + t,
                                n = void 0 === e.duration ? void 0 : i + e.duration / d;
                            let r, o;
                            if (!b.Z && e.eventStreamData instanceof Element) r = e.eventStreamData;
                            else try {
                                o = {
                                    namespaces: h,
                                    data: (0, k.uR)(new Uint8Array(e.eventStreamData))
                                }
                            } catch (e) {
                                l.Z.error("DASH: Error while parsing event-stream:", e instanceof Error ? e.message : "Unknown error")
                            }
                            a.push({
                                start: i,
                                end: n,
                                id: e.id,
                                data: {
                                    type: "dash-event-stream",
                                    value: {
                                        schemeIdUri: c,
                                        timescale: d,
                                        element: r,
                                        xmlData: o
                                    }
                                }
                            })
                        }
                }
                return a
            }
            const _e = function e(t, i, n, s, a = new WeakMap) {
                const m = t.children,
                    f = t.attributes;
                if ((0, r.Z)(i.externalClockOffset)) {
                    const a = "dynamic" === f.type,
                        o = (0, c.Z)(m.utcTimings, (e => "urn:mpeg:dash:utc:direct:2014" === e.schemeIdUri && !(0, r.Z)(e.value))),
                        u = (0, r.Z)(o) || (0, r.Z)(o.value) ? void 0 : h(o.value),
                        d = (0, r.Z)(u) || isNaN(u) ? void 0 : u;
                    if ((0, r.Z)(d) || !0 === s) {
                        if (a && !0 !== s) {
                            const s = function (e) {
                                const t = e.children.utcTimings.filter((e => ("urn:mpeg:dash:utc:http-iso:2014" === e.schemeIdUri || "urn:mpeg:dash:utc:http-xsdate:2014" === e.schemeIdUri) && void 0 !== e.value));
                                return t.length > 0 ? t[0].value : void 0
                            }(t);
                            if (!(0, r.Z)(s) && s.length > 0) return {
                                type: "needs-clock",
                                value: {
                                    url: s,
                                    continue: function (s) {
                                        return s.success ? (i.externalClockOffset = h(s.data), e(t, i, n, !0)) : (n.push(s.error), l.Z.warn("DASH Parser: Error on fetching the clock ressource", s.error), e(t, i, n, !0))
                                    }
                                }
                            }
                        }
                    } else i.externalClockOffset = d
                }
                const v = [];
                for (let e = 0; e < m.periods.length; e++) {
                    const t = m.periods[e].attributes,
                        i = t.xlinkHref,
                        n = t.xlinkActuate;
                    (0, r.Z)(i) || "onLoad" !== n || v.push({
                        index: e,
                        ressource: i
                    })
                }
                return 0 === v.length ? function (e, t, i, n) {
                    var s, a, c, h;
                    const m = e.children,
                        f = e.attributes,
                        v = "dynamic" === f.type,
                        y = void 0 !== t.url ? [{
                            url: t.url.substring(0, (0, d.$)(t.url))
                        }] : [],
                        b = re(y, m.baseURLs),
                        T = function (e, t) {
                            return "dynamic" !== e.type ? 0 : (0, r.Z)(e.availabilityStartTime) ? null != t ? t : 0 : e.availabilityStartTime
                        }(f, t.referenceDateTime),
                        k = f.timeShiftBufferDepth,
                        _ = t.externalClockOffset,
                        S = t.unsafelyBaseOnPreviousManifest,
                        w = t.externalClockOffset,
                        E = new g({
                            availabilityStartTime: T,
                            isDynamic: v,
                            timeShiftBufferDepth: k,
                            serverTimestampOffset: w
                        }),
                        D = {
                            availabilityStartTime: T,
                            baseURLs: b,
                            clockOffset: _,
                            duration: f.duration,
                            isDynamic: v,
                            manifestBoundsCalculator: E,
                            manifestProfiles: e.attributes.profiles,
                            receivedTime: t.manifestReceivedTime,
                            timeShiftBufferDepth: k,
                            unsafelyBaseOnPreviousManifest: S,
                            xlinkInfos: n,
                            xmlNamespaces: e.attributes.namespaces
                        },
                        x = ye(m.periods, D),
                        P = f.duration;
                    let Z, I, C, R = null;
                    void 0 !== f.minimumUpdatePeriod && f.minimumUpdatePeriod >= 0 && (Z = 0 === f.minimumUpdatePeriod ? o.Z.getCurrent().DASH_FALLBACK_LIFETIME_WHEN_MINIMUM_UPDATE_PERIOD_EQUAL_0 : f.minimumUpdatePeriod);
                    const A = p(x),
                        M = A.minimumSafePosition,
                        N = A.maximumSafePosition,
                        L = A.maximumUnsafePosition,
                        U = (0, u.Z)();
                    if (v) {
                        let e;
                        if (void 0 !== N) e = N;
                        else if (void 0 === w) l.Z.warn("DASH Parser: use system clock to define maximum position"), e = Date.now() / 1e3 - T;
                        else {
                            e = ((0, u.Z)() + w) / 1e3 - T
                        }
                        let t = E.getEstimatedLiveEdge();
                        void 0 === t && (t = void 0 !== L ? L : e), C = {
                            isLinear: !0,
                            maximumSafePosition: e,
                            livePosition: t,
                            time: U
                        }, I = M, R = null != k ? k : null, null !== R && void 0 !== I && t - I > R && (R = t - I)
                    } else {
                        I = M, void 0 === I && (I = null !== (a = null === (s = x[0]) || void 0 === s ? void 0 : s.start) && void 0 !== a ? a : 0);
                        let e = null != P ? P : 1 / 0;
                        if (void 0 !== x[x.length - 1]) {
                            const t = x[x.length - 1],
                                i = null !== (c = t.end) && void 0 !== c ? c : void 0 !== t.duration ? t.start + t.duration : void 0;
                            void 0 !== i && i < e && (e = i)
                        }
                        void 0 !== N && N < e && (e = N), C = {
                            isLinear: !1,
                            maximumSafePosition: e,
                            livePosition: void 0,
                            time: U
                        }
                    }
                    const O = !v || void 0 === e.attributes.minimumUpdatePeriod && (void 0 !== (null === (h = x[x.length - 1]) || void 0 === h ? void 0 : h.end) || void 0 !== e.attributes.duration),
                        z = {
                            availabilityStartTime: T,
                            clockOffset: t.externalClockOffset,
                            isDynamic: v,
                            isLive: v,
                            isLastPeriodKnown: O,
                            periods: x,
                            publishTime: f.publishTime,
                            suggestedPresentationDelay: f.suggestedPresentationDelay,
                            transportType: "dash",
                            timeBounds: {
                                minimumSafePosition: I,
                                timeshiftDepth: R,
                                maximumTimeData: C
                            },
                            lifetime: Z,
                            uris: (0, r.Z)(t.url) ? m.locations : [t.url, ...m.locations]
                        };
                    return {
                        type: "done",
                        value: {
                            parsed: z,
                            warnings: i
                        }
                    }
                }(t, i, n, a) : {
                    type: "needs-xlinks",
                    value: {
                        xlinksUrls: v.map((({
                            ressource: e
                        }) => e)),
                        continue: function (r) {
                            if (r.length !== v.length) throw new Error("DASH parser: wrong number of loaded ressources.");
                            for (let e = r.length - 1; e >= 0; e--) {
                                const t = v[e].index,
                                    i = r[e],
                                    s = i.parsed,
                                    o = i.warnings,
                                    l = i.receivedTime,
                                    c = i.sendingTime,
                                    u = i.url;
                                o.length > 0 && n.push(...o);
                                for (const e of s) a.set(e, {
                                    receivedTime: l,
                                    sendingTime: c,
                                    url: u
                                });
                                m.periods.splice(t, 1, ...s)
                            }
                            return e(t, i, n, s, a)
                        }
                    }
                }
            };

            function Se(e) {
                const t = e.textContent,
                    i = [];
                return null === t || 0 === t.length ? [void 0, i] : [{
                    value: t
                }, i]
            }

            function we(e) {
                const t = {};
                for (let i = 0; i < e.attributes.length; i++) {
                    const n = e.attributes[i];
                    switch (n.name) {
                    case "id":
                        t.id = n.value;
                        break;
                    case "lang":
                        t.language = n.value;
                        break;
                    case "contentType":
                        t.contentType = n.value;
                        break;
                    case "par":
                        t.par = n.value
                    }
                }
                return t
            }
            var Ee = i(14926);
            const De = /^P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/,
                xe = /([0-9]+)-([0-9]+)/;

            function Pe(e, t) {
                if ("true" === e) return [!0, null];
                if ("false" === e) return [!1, null];
                return [!1, new ze(`\`${t}\` property is not a boolean value but "${e}"`)]
            }

            function Ze(e, t) {
                const i = parseInt(e, 10);
                if (isNaN(i)) {
                    return [null, new ze(`\`${t}\` property is not an integer value but "${e}"`)]
                }
                return [i, null]
            }

            function Ie(e, t) {
                if ("INF" === e) return [1 / 0, null];
                const i = parseFloat(e);
                if (isNaN(i)) {
                    return [null, new ze(`\`${t}\` property is invalid: "${e}"`)]
                }
                return [i, null]
            }

            function Ce(e, t) {
                if ("true" === e) return [!0, null];
                if ("false" === e) return [!1, null];
                const i = parseInt(e, 10);
                if (isNaN(i)) {
                    return [null, new ze(`\`${t}\` property is not a boolean nor an integer but "${e}"`)]
                }
                return [i, null]
            }

            function Re(e, t) {
                const i = Date.parse(e);
                if (isNaN(i)) {
                    return [null, new ze(`\`${t}\` is in an invalid date format: "${e}"`)]
                }
                return [new Date(Date.parse(e)).getTime() / 1e3, null]
            }

            function Ae(e, t) {
                if (!(0, E.Z)(e)) {
                    return [0, new ze(`\`${t}\` property is empty`)]
                }
                const i = De.exec(e);
                if (null === i) {
                    return [null, new ze(`\`${t}\` property has an unrecognized format "${e}"`)]
                }
                return [365 * parseFloat((0, E.Z)(i[2]) ? i[2] : "0") * 24 * 60 * 60 + 30 * parseFloat((0, E.Z)(i[4]) ? i[4] : "0") * 24 * 60 * 60 + 24 * parseFloat((0, E.Z)(i[6]) ? i[6] : "0") * 60 * 60 + 60 * parseFloat((0, E.Z)(i[8]) ? i[8] : "0") * 60 + 60 * parseFloat((0, E.Z)(i[10]) ? i[10] : "0") + parseFloat((0, E.Z)(i[12]) ? i[12] : "0"), null]
            }

            function Me(e, t) {
                const i = xe.exec(e);
                if (null === i) {
                    return [null, new ze(`\`${t}\` property has an unrecognized format "${e}"`)]
                }
                return [
                    [+i[1], +i[2]], null
                ]
            }

            function Ne(e, t) {
                try {
                    return [(0, Ee.K)(e), null]
                } catch (i) {
                    return [null, new ze(`\`${t}\` is not a valid base64 string: "${e}"`)]
                }
            }

            function Le(e, t) {
                const i = /^(\d+)\/(\d+)$/.exec(e);
                return null !== i ? [+i[1] / +i[2], null] : Ie(e, t)
            }

            function Ue(e) {
                let t, i;
                for (let n = 0; n < e.attributes.length; n++) {
                    const s = e.attributes[n];
                    switch (s.name) {
                    case "schemeIdUri":
                        t = s.value;
                        break;
                    case "value":
                        i = s.value
                    }
                }
                return {
                    schemeIdUri: t,
                    value: i
                }
            }

            function Oe(e, t) {
                return function (i, {
                    asKey: n,
                    parser: s,
                    dashName: a
                }) {
                    const r = s(i, a),
                        o = r[0],
                        c = r[1];
                    null !== c && (l.Z.warn(c.message), t.push(c)), null !== o && (e[n] = o)
                }
            }
            class ze extends Error {
                constructor(e) {
                    super(), Object.setPrototypeOf(this, ze.prototype), this.name = "MPDError", this.message = e
                }
            }

            function Ke(e) {
                const t = function (e) {
                        const t = [],
                            i = [];
                        for (let n = 0; n < e.length; n++)
                            if (e[n].nodeType === Node.ELEMENT_NODE) {
                                const s = e[n];
                                if ("cenc:pssh" === s.nodeName) {
                                    const e = s.textContent;
                                    if (null !== e && e.length > 0) {
                                        const n = Ne(e, "cenc:pssh"),
                                            s = n[0],
                                            a = n[1];
                                        null !== a && (l.Z.warn(a.message), t.push(a)), null !== s && i.push(s)
                                    }
                                }
                            } return [{
                            cencPssh: i
                        }, t]
                    }(e.childNodes),
                    i = t[0],
                    n = t[1];
                return [{
                    children: i,
                    attributes: function (e) {
                        const t = {};
                        for (let i = 0; i < e.attributes.length; i++) {
                            const n = e.attributes[i];
                            switch (n.name) {
                            case "schemeIdUri":
                                t.schemeIdUri = n.value;
                                break;
                            case "value":
                                t.value = n.value;
                                break;
                            case "cenc:default_KID":
                                t.keyId = (0, k.nr)(n.value.replace(/-/g, ""))
                            }
                        }
                        return t
                    }(e)
                }, n]
            }

            function Fe(e) {
                const t = {},
                    i = [],
                    n = Oe(t, i);
                for (let i = 0; i < e.attributes.length; i++) {
                    const s = e.attributes[i];
                    switch (s.name) {
                    case "range":
                        n(s.value, {
                            asKey: "range",
                            parser: Me,
                            dashName: "range"
                        });
                        break;
                    case "sourceURL":
                        t.media = s.value
                    }
                }
                return [t, i]
            }

            function Be(e) {
                const t = {};
                let i = [];
                const n = Oe(t, i),
                    s = e.childNodes;
                for (let e = 0; e < s.length; e++)
                    if (s[e].nodeType === Node.ELEMENT_NODE) {
                        const n = s[e];
                        if ("Initialization" === n.nodeName) {
                            const e = Fe(n),
                                s = e[0],
                                a = e[1];
                            t.initialization = s, i = i.concat(a)
                        }
                    } for (let t = 0; t < e.attributes.length; t++) {
                    const i = e.attributes[t];
                    switch (i.name) {
                    case "timescale":
                        n(i.value, {
                            asKey: "timescale",
                            parser: Ze,
                            dashName: "timescale"
                        });
                        break;
                    case "presentationTimeOffset":
                        n(i.value, {
                            asKey: "presentationTimeOffset",
                            parser: Ie,
                            dashName: "presentationTimeOffset"
                        });
                        break;
                    case "indexRange":
                        n(i.value, {
                            asKey: "indexRange",
                            parser: Me,
                            dashName: "indexRange"
                        });
                        break;
                    case "indexRangeExact":
                        n(i.value, {
                            asKey: "indexRangeExact",
                            parser: Pe,
                            dashName: "indexRangeExact"
                        });
                        break;
                    case "availabilityTimeOffset":
                        n(i.value, {
                            asKey: "availabilityTimeOffset",
                            parser: Ie,
                            dashName: "availabilityTimeOffset"
                        });
                        break;
                    case "availabilityTimeComplete":
                        n(i.value, {
                            asKey: "availabilityTimeComplete",
                            parser: Pe,
                            dashName: "availabilityTimeComplete"
                        });
                        break;
                    case "duration":
                        n(i.value, {
                            asKey: "duration",
                            parser: Ze,
                            dashName: "duration"
                        });
                        break;
                    case "startNumber":
                        n(i.value, {
                            asKey: "startNumber",
                            parser: Ze,
                            dashName: "startNumber"
                        });
                        break;
                    case "endNumber":
                        n(i.value, {
                            asKey: "endNumber",
                            parser: Ze,
                            dashName: "endNumber"
                        })
                    }
                }
                return [t, i]
            }

            function Ve(e) {
                const t = {},
                    i = [],
                    n = Oe(t, i);
                for (let i = 0; i < e.attributes.length; i++) {
                    const s = e.attributes[i];
                    switch (s.name) {
                    case "media":
                        t.media = s.value;
                        break;
                    case "indexRange":
                        n(s.value, {
                            asKey: "indexRange",
                            parser: Me,
                            dashName: "indexRange"
                        });
                        break;
                    case "index":
                        t.index = s.value;
                        break;
                    case "mediaRange":
                        n(s.value, {
                            asKey: "mediaRange",
                            parser: Me,
                            dashName: "mediaRange"
                        })
                    }
                }
                return [t, i]
            }

            function He(e) {
                const t = Be(e),
                    i = t[0];
                let n = t[1];
                const s = [],
                    a = e.childNodes;
                for (let e = 0; e < a.length; e++)
                    if (a[e].nodeType === Node.ELEMENT_NODE) {
                        const t = a[e];
                        if ("SegmentURL" === t.nodeName) {
                            const e = Ve(t),
                                i = e[0],
                                a = e[1];
                            s.push(i), n = n.concat(a)
                        }
                    } return [(0, Z.Z)(i, {
                    list: s
                }), n]
            }

            function We(e) {
                let t = null;
                return function () {
                    if (null === t) {
                        const i = e.getElementsByTagName("S");
                        return t = i, i
                    }
                    return t
                }
            }

            function $e(e) {
                const t = Be(e),
                    i = t[0],
                    n = t[1];
                let s;
                for (let t = 0; t < e.childNodes.length; t++)
                    if (e.childNodes[t].nodeType === Node.ELEMENT_NODE) {
                        const i = e.childNodes[t];
                        "SegmentTimeline" === i.nodeName && (s = We(i))
                    } const a = (0, Z.Z)({}, i, {
                        duration: i.duration,
                        timelineParser: s
                    }),
                    o = Oe(a, n);
                for (let t = 0; t < e.attributes.length; t++) {
                    const i = e.attributes[t];
                    switch (i.nodeName) {
                    case "initialization":
                        (0, r.Z)(a.initialization) && (a.initialization = {
                            media: i.value
                        });
                        break;
                    case "index":
                        a.index = i.value;
                        break;
                    case "availabilityTimeOffset":
                        o(i.value, {
                            asKey: "availabilityTimeOffset",
                            parser: Ie,
                            dashName: "availabilityTimeOffset"
                        });
                        break;
                    case "availabilityTimeComplete":
                        o(i.value, {
                            asKey: "availabilityTimeComplete",
                            parser: Pe,
                            dashName: "availabilityTimeComplete"
                        });
                        break;
                    case "media":
                        a.media = i.value;
                        break;
                    case "bitstreamSwitching":
                        o(i.value, {
                            asKey: "bitstreamSwitching",
                            parser: Pe,
                            dashName: "bitstreamSwitching"
                        })
                    }
                }
                return [a, n]
            }

            function Ge(e) {
                const t = function (e) {
                        const t = {
                                baseURLs: []
                            },
                            i = [];
                        let n = [];
                        for (let s = 0; s < e.length; s++)
                            if (e[s].nodeType === Node.ELEMENT_NODE) {
                                const a = e[s];
                                switch (a.nodeName) {
                                case "BaseURL":
                                    const e = Se(a),
                                        s = e[0],
                                        o = e[1];
                                    void 0 !== s && t.baseURLs.push(s), n = n.concat(o);
                                    break;
                                case "InbandEventStream":
                                    void 0 === t.inbandEventStreams && (t.inbandEventStreams = []), t.inbandEventStreams.push(Ue(a));
                                    break;
                                case "SegmentBase":
                                    const l = Be(a),
                                        c = l[0],
                                        u = l[1];
                                    t.segmentBase = c, u.length > 0 && (n = n.concat(u));
                                    break;
                                case "SegmentList":
                                    const d = He(a),
                                        h = d[0],
                                        m = d[1];
                                    n = n.concat(m), t.segmentList = h;
                                    break;
                                case "SegmentTemplate":
                                    const f = $e(a),
                                        p = f[0],
                                        g = f[1];
                                    n = n.concat(g), t.segmentTemplate = p;
                                    break;
                                case "ContentProtection":
                                    const v = Ke(a),
                                        y = v[0],
                                        b = v[1];
                                    b.length > 0 && (n = n.concat(b)), void 0 !== y && i.push(y);
                                    break;
                                case "SupplementalProperty":
                                    (0, r.Z)(t.supplementalProperties) ? t.supplementalProperties = [Ue(a)]: t.supplementalProperties.push(Ue(a))
                                }
                            } return i.length > 0 && (t.contentProtections = i), [t, n]
                    }(e.childNodes),
                    i = t[0],
                    n = t[1],
                    s = function (e) {
                        const t = {},
                            i = [],
                            n = Oe(t, i);
                        for (let i = 0; i < e.attributes.length; i++) {
                            const s = e.attributes[i];
                            switch (s.name) {
                            case "audioSamplingRate":
                                t.audioSamplingRate = s.value;
                                break;
                            case "bandwidth":
                                n(s.value, {
                                    asKey: "bitrate",
                                    parser: Ze,
                                    dashName: "bandwidth"
                                });
                                break;
                            case "codecs":
                                t.codecs = s.value;
                                break;
                            case "codingDependency":
                                n(s.value, {
                                    asKey: "codingDependency",
                                    parser: Pe,
                                    dashName: "codingDependency"
                                });
                                break;
                            case "frameRate":
                                n(s.value, {
                                    asKey: "frameRate",
                                    parser: Le,
                                    dashName: "frameRate"
                                });
                                break;
                            case "height":
                                n(s.value, {
                                    asKey: "height",
                                    parser: Ze,
                                    dashName: "height"
                                });
                                break;
                            case "id":
                                t.id = s.value;
                                break;
                            case "maxPlayoutRate":
                                n(s.value, {
                                    asKey: "maxPlayoutRate",
                                    parser: Ie,
                                    dashName: "maxPlayoutRate"
                                });
                                break;
                            case "maximumSAPPeriod":
                                n(s.value, {
                                    asKey: "maximumSAPPeriod",
                                    parser: Ie,
                                    dashName: "maximumSAPPeriod"
                                });
                                break;
                            case "mimeType":
                                t.mimeType = s.value;
                                break;
                            case "profiles":
                                t.profiles = s.value;
                                break;
                            case "qualityRanking":
                                n(s.value, {
                                    asKey: "qualityRanking",
                                    parser: Ze,
                                    dashName: "qualityRanking"
                                });
                                break;
                            case "scte214:supplementalCodecs":
                                t.supplementalCodecs = s.value;
                                break;
                            case "segmentProfiles":
                                t.segmentProfiles = s.value;
                                break;
                            case "width":
                                n(s.value, {
                                    asKey: "width",
                                    parser: Ze,
                                    dashName: "width"
                                });
                                break;
                            case "availabilityTimeOffset":
                                n(s.value, {
                                    asKey: "availabilityTimeOffset",
                                    parser: Ie,
                                    dashName: "availabilityTimeOffset"
                                });
                                break;
                            case "availabilityTimeComplete":
                                n(s.value, {
                                    asKey: "availabilityTimeComplete",
                                    parser: Pe,
                                    dashName: "availabilityTimeComplete"
                                })
                            }
                        }
                        return void 0 === t.bitrate && i.push(new ze("No bitrate found on a Representation")), [t, i]
                    }(e),
                    a = s[0],
                    o = s[1];
                return [{
                    children: i,
                    attributes: a
                }, n.concat(o)]
            }

            function Xe(e) {
                const t = function (e) {
                        const t = {
                                baseURLs: [],
                                representations: []
                            },
                            i = [];
                        let n = [];
                        for (let s = 0; s < e.length; s++)
                            if (e[s].nodeType === Node.ELEMENT_NODE) {
                                const a = e[s];
                                switch (a.nodeName) {
                                case "Accessibility":
                                    void 0 === t.accessibilities ? t.accessibilities = [Ue(a)] : t.accessibilities.push(Ue(a));
                                    break;
                                case "BaseURL":
                                    const e = Se(a),
                                        s = e[0],
                                        o = e[1];
                                    void 0 !== s && t.baseURLs.push(s), o.length > 0 && (n = n.concat(o));
                                    break;
                                case "ContentComponent":
                                    t.contentComponent = we(a);
                                    break;
                                case "EssentialProperty":
                                    (0, r.Z)(t.essentialProperties) ? t.essentialProperties = [Ue(a)]: t.essentialProperties.push(Ue(a));
                                    break;
                                case "InbandEventStream":
                                    void 0 === t.inbandEventStreams && (t.inbandEventStreams = []), t.inbandEventStreams.push(Ue(a));
                                    break;
                                case "Label":
                                    const l = a.textContent;
                                    null != l && (t.label = l);
                                    break;
                                case "Representation":
                                    const c = Ge(a),
                                        u = c[0],
                                        d = c[1];
                                    t.representations.push(u), d.length > 0 && (n = n.concat(d));
                                    break;
                                case "Role":
                                    (0, r.Z)(t.roles) ? t.roles = [Ue(a)]: t.roles.push(Ue(a));
                                    break;
                                case "SupplementalProperty":
                                    (0, r.Z)(t.supplementalProperties) ? t.supplementalProperties = [Ue(a)]: t.supplementalProperties.push(Ue(a));
                                    break;
                                case "SegmentBase":
                                    const h = Be(a),
                                        m = h[0],
                                        f = h[1];
                                    t.segmentBase = m, f.length > 0 && (n = n.concat(f));
                                    break;
                                case "SegmentList":
                                    const p = He(a),
                                        g = p[0],
                                        v = p[1];
                                    t.segmentList = g, v.length > 0 && (n = n.concat(v));
                                    break;
                                case "SegmentTemplate":
                                    const y = $e(a),
                                        b = y[0],
                                        T = y[1];
                                    t.segmentTemplate = b, T.length > 0 && (n = n.concat(T));
                                    break;
                                case "ContentProtection":
                                    const k = Ke(a),
                                        _ = k[0],
                                        S = k[1];
                                    S.length > 0 && (n = n.concat(S)), void 0 !== _ && i.push(_)
                                }
                            } return i.length > 0 && (t.contentProtections = i), [t, n]
                    }(e.childNodes),
                    i = t[0],
                    n = t[1],
                    s = function (e) {
                        const t = {},
                            i = [],
                            n = Oe(t, i);
                        for (let i = 0; i < e.attributes.length; i++) {
                            const s = e.attributes[i];
                            switch (s.name) {
                            case "id":
                                t.id = s.value;
                                break;
                            case "group":
                                n(s.value, {
                                    asKey: "group",
                                    parser: Ze,
                                    dashName: "group"
                                });
                                break;
                            case "lang":
                                t.language = s.value;
                                break;
                            case "contentType":
                                t.contentType = s.value;
                                break;
                            case "par":
                                t.par = s.value;
                                break;
                            case "minBandwidth":
                                n(s.value, {
                                    asKey: "minBitrate",
                                    parser: Ze,
                                    dashName: "minBandwidth"
                                });
                                break;
                            case "maxBandwidth":
                                n(s.value, {
                                    asKey: "maxBitrate",
                                    parser: Ze,
                                    dashName: "maxBandwidth"
                                });
                                break;
                            case "minWidth":
                                n(s.value, {
                                    asKey: "minWidth",
                                    parser: Ze,
                                    dashName: "minWidth"
                                });
                                break;
                            case "maxWidth":
                                n(s.value, {
                                    asKey: "maxWidth",
                                    parser: Ze,
                                    dashName: "maxWidth"
                                });
                                break;
                            case "minHeight":
                                n(s.value, {
                                    asKey: "minHeight",
                                    parser: Ze,
                                    dashName: "minHeight"
                                });
                                break;
                            case "maxHeight":
                                n(s.value, {
                                    asKey: "maxHeight",
                                    parser: Ze,
                                    dashName: "maxHeight"
                                });
                                break;
                            case "minFrameRate":
                                n(s.value, {
                                    asKey: "minFrameRate",
                                    parser: Le,
                                    dashName: "minFrameRate"
                                });
                                break;
                            case "maxFrameRate":
                                n(s.value, {
                                    asKey: "maxFrameRate",
                                    parser: Le,
                                    dashName: "maxFrameRate"
                                });
                                break;
                            case "selectionPriority":
                                n(s.value, {
                                    asKey: "selectionPriority",
                                    parser: Ze,
                                    dashName: "selectionPriority"
                                });
                                break;
                            case "segmentAlignment":
                                n(s.value, {
                                    asKey: "segmentAlignment",
                                    parser: Ce,
                                    dashName: "segmentAlignment"
                                });
                                break;
                            case "subsegmentAlignment":
                                n(s.value, {
                                    asKey: "subsegmentAlignment",
                                    parser: Ce,
                                    dashName: "subsegmentAlignment"
                                });
                                break;
                            case "bitstreamSwitching":
                                n(s.value, {
                                    asKey: "bitstreamSwitching",
                                    parser: Pe,
                                    dashName: "bitstreamSwitching"
                                });
                                break;
                            case "audioSamplingRate":
                                t.audioSamplingRate = s.value;
                                break;
                            case "codecs":
                                t.codecs = s.value;
                                break;
                            case "scte214:supplementalCodecs":
                                t.supplementalCodecs = s.value;
                                break;
                            case "codingDependency":
                                n(s.value, {
                                    asKey: "codingDependency",
                                    parser: Pe,
                                    dashName: "codingDependency"
                                });
                                break;
                            case "frameRate":
                                n(s.value, {
                                    asKey: "frameRate",
                                    parser: Le,
                                    dashName: "frameRate"
                                });
                                break;
                            case "height":
                                n(s.value, {
                                    asKey: "height",
                                    parser: Ze,
                                    dashName: "height"
                                });
                                break;
                            case "maxPlayoutRate":
                                n(s.value, {
                                    asKey: "maxPlayoutRate",
                                    parser: Ie,
                                    dashName: "maxPlayoutRate"
                                });
                                break;
                            case "maximumSAPPeriod":
                                n(s.value, {
                                    asKey: "maximumSAPPeriod",
                                    parser: Ie,
                                    dashName: "maximumSAPPeriod"
                                });
                                break;
                            case "mimeType":
                                t.mimeType = s.value;
                                break;
                            case "profiles":
                                t.profiles = s.value;
                                break;
                            case "segmentProfiles":
                                t.segmentProfiles = s.value;
                                break;
                            case "width":
                                n(s.value, {
                                    asKey: "width",
                                    parser: Ze,
                                    dashName: "width"
                                });
                                break;
                            case "availabilityTimeOffset":
                                n(s.value, {
                                    asKey: "availabilityTimeOffset",
                                    parser: Ie,
                                    dashName: "availabilityTimeOffset"
                                });
                                break;
                            case "availabilityTimeComplete":
                                n(s.value, {
                                    asKey: "availabilityTimeComplete",
                                    parser: Pe,
                                    dashName: "availabilityTimeComplete"
                                })
                            }
                        }
                        return [t, i]
                    }(e),
                    a = s[0],
                    o = s[1];
                return [{
                    children: i,
                    attributes: a
                }, n.concat(o)]
            }

            function qe(e) {
                const t = {
                    children: {
                        events: []
                    },
                    attributes: {}
                };
                let i = [];
                const n = Oe(t.attributes, i);
                for (let i = 0; i < e.attributes.length; i++) {
                    const s = e.attributes[i];
                    switch (s.name) {
                    case "schemeIdUri":
                        t.attributes.schemeIdUri = s.value;
                        break;
                    case "timescale":
                        n(s.value, {
                            asKey: "timescale",
                            parser: Ze,
                            dashName: "timescale"
                        });
                        break;
                    case "value":
                        t.attributes.value = s.value
                    }
                }
                for (let n = 0; n < e.childNodes.length; n++)
                    if (e.childNodes[n].nodeType === Node.ELEMENT_NODE) {
                        const s = e.childNodes[n];
                        if ("Event" === s.nodeName) {
                            const e = je(s),
                                n = e[0],
                                a = e[1];
                            t.children.events.push(n), a.length > 0 && (i = i.concat(a))
                        }
                    } return [t, i]
            }

            function je(e) {
                const t = {
                        eventStreamData: e
                    },
                    i = [],
                    n = Oe(t, i);
                for (let i = 0; i < e.attributes.length; i++) {
                    const s = e.attributes[i];
                    switch (s.name) {
                    case "presentationTime":
                        n(s.value, {
                            asKey: "presentationTime",
                            parser: Ze,
                            dashName: "presentationTime"
                        });
                        break;
                    case "duration":
                        n(s.value, {
                            asKey: "duration",
                            parser: Ze,
                            dashName: "duration"
                        });
                        break;
                    case "id":
                        t.id = s.value
                    }
                }
                return [t, i]
            }

            function Qe(e) {
                const t = function (e) {
                        const t = [],
                            i = [];
                        let n, s = [];
                        const a = [];
                        for (let r = 0; r < e.length; r++)
                            if (e[r].nodeType === Node.ELEMENT_NODE) {
                                const o = e[r];
                                switch (o.nodeName) {
                                case "BaseURL":
                                    const e = Se(o),
                                        r = e[0],
                                        l = e[1];
                                    void 0 !== r && t.push(r), s = s.concat(l);
                                    break;
                                case "AdaptationSet":
                                    const c = Xe(o),
                                        u = c[0],
                                        d = c[1];
                                    i.push(u), s = s.concat(d);
                                    break;
                                case "EventStream":
                                    const h = qe(o),
                                        m = h[0],
                                        f = h[1];
                                    a.push(m), s = s.concat(f);
                                    break;
                                case "SegmentTemplate":
                                    const p = $e(o),
                                        g = p[0],
                                        v = p[1];
                                    n = g, v.length > 0 && (s = s.concat(v))
                                }
                            } return [{
                            baseURLs: t,
                            adaptations: i,
                            eventStreams: a,
                            segmentTemplate: n
                        }, s]
                    }(e.childNodes),
                    i = t[0],
                    n = t[1],
                    s = function (e) {
                        const t = {},
                            i = [],
                            n = Oe(t, i);
                        for (let i = 0; i < e.attributes.length; i++) {
                            const s = e.attributes[i];
                            switch (s.name) {
                            case "id":
                                t.id = s.value;
                                break;
                            case "start":
                                n(s.value, {
                                    asKey: "start",
                                    parser: Ae,
                                    dashName: "start"
                                });
                                break;
                            case "duration":
                                n(s.value, {
                                    asKey: "duration",
                                    parser: Ae,
                                    dashName: "duration"
                                });
                                break;
                            case "bitstreamSwitching":
                                n(s.value, {
                                    asKey: "bitstreamSwitching",
                                    parser: Pe,
                                    dashName: "bitstreamSwitching"
                                });
                                break;
                            case "xlink:href":
                                t.xlinkHref = s.value;
                                break;
                            case "xlink:actuate":
                                t.xlinkActuate = s.value
                            }
                        }
                        return [t, i]
                    }(e),
                    a = s[0],
                    r = s[1];
                return [{
                    children: i,
                    attributes: a
                }, n.concat(r)]
            }

            function Ye(e) {
                const t = function (e) {
                        const t = [],
                            i = [],
                            n = [],
                            s = [];
                        let a = [];
                        for (let r = 0; r < e.length; r++)
                            if (e[r].nodeType === Node.ELEMENT_NODE) {
                                const o = e[r];
                                switch (o.nodeName) {
                                case "BaseURL":
                                    const e = Se(o),
                                        r = e[0],
                                        l = e[1];
                                    void 0 !== r && t.push(r), a = a.concat(l);
                                    break;
                                case "Location":
                                    i.push(null === o.textContent ? "" : o.textContent);
                                    break;
                                case "Period":
                                    const c = Qe(o),
                                        u = c[0],
                                        d = c[1];
                                    n.push(u), a = a.concat(d);
                                    break;
                                case "UTCTiming":
                                    const h = Ue(o);
                                    s.push(h)
                                }
                            } return [{
                            baseURLs: t,
                            locations: i,
                            periods: n,
                            utcTimings: s
                        }, a]
                    }(e.childNodes),
                    i = t[0],
                    n = t[1],
                    s = function (e) {
                        const t = {},
                            i = [],
                            n = Oe(t, i);
                        for (let i = 0; i < e.attributes.length; i++) {
                            const s = e.attributes[i];
                            switch (s.name) {
                            case "id":
                                t.id = s.value;
                                break;
                            case "profiles":
                                t.profiles = s.value;
                                break;
                            case "type":
                                t.type = s.value;
                                break;
                            case "availabilityStartTime":
                                n(s.value, {
                                    asKey: "availabilityStartTime",
                                    parser: Re,
                                    dashName: "availabilityStartTime"
                                });
                                break;
                            case "availabilityEndTime":
                                n(s.value, {
                                    asKey: "availabilityEndTime",
                                    parser: Re,
                                    dashName: "availabilityEndTime"
                                });
                                break;
                            case "publishTime":
                                n(s.value, {
                                    asKey: "publishTime",
                                    parser: Re,
                                    dashName: "publishTime"
                                });
                                break;
                            case "mediaPresentationDuration":
                                n(s.value, {
                                    asKey: "duration",
                                    parser: Ae,
                                    dashName: "mediaPresentationDuration"
                                });
                                break;
                            case "minimumUpdatePeriod":
                                n(s.value, {
                                    asKey: "minimumUpdatePeriod",
                                    parser: Ae,
                                    dashName: "minimumUpdatePeriod"
                                });
                                break;
                            case "minBufferTime":
                                n(s.value, {
                                    asKey: "minBufferTime",
                                    parser: Ae,
                                    dashName: "minBufferTime"
                                });
                                break;
                            case "timeShiftBufferDepth":
                                n(s.value, {
                                    asKey: "timeShiftBufferDepth",
                                    parser: Ae,
                                    dashName: "timeShiftBufferDepth"
                                });
                                break;
                            case "suggestedPresentationDelay":
                                n(s.value, {
                                    asKey: "suggestedPresentationDelay",
                                    parser: Ae,
                                    dashName: "suggestedPresentationDelay"
                                });
                                break;
                            case "maxSegmentDuration":
                                n(s.value, {
                                    asKey: "maxSegmentDuration",
                                    parser: Ae,
                                    dashName: "maxSegmentDuration"
                                });
                                break;
                            case "maxSubsegmentDuration":
                                n(s.value, {
                                    asKey: "maxSubsegmentDuration",
                                    parser: Ae,
                                    dashName: "maxSubsegmentDuration"
                                })
                            }
                        }
                        return [t, i]
                    }(e),
                    a = s[0],
                    r = s[1];
                return [{
                    children: i,
                    attributes: a
                }, n.concat(r)]
            }
            const Je = function (e, t) {
                const i = e.documentElement;
                if ((0, r.Z)(i) || "MPD" !== i.nodeName) throw new Error("DASH Parser: document root should be MPD");
                const n = Ye(i),
                    s = n[0],
                    o = n[1];
                return function e(t) {
                    if ("done" === t.type) return t;
                    if ("needs-clock" === t.type) return {
                        type: "needs-resources",
                        value: {
                            urls: [t.value.url],
                            format: "string",
                            continue (i) {
                                if (1 !== i.length) throw new Error("DASH parser: wrong number of loaded ressources.");
                                const n = t.value.continue(i[0].responseData);
                                return e(n)
                            }
                        }
                    };
                    if ("needs-xlinks" === t.type) return {
                        type: "needs-resources",
                        value: {
                            urls: t.value.xlinksUrls,
                            format: "string",
                            continue (i) {
                                const n = [];
                                for (let e = 0; e < i.length; e++) {
                                    const t = i[e],
                                        s = t.responseData,
                                        a = t.receivedTime,
                                        o = t.sendingTime,
                                        l = t.url;
                                    if (!s.success) throw s.error;
                                    const c = "<root>" + s.data + "</root>",
                                        u = (new DOMParser).parseFromString(c, "text/xml");
                                    if ((0, r.Z)(u) || 0 === u.children.length) throw new Error("DASH parser: Invalid external ressources");
                                    const d = u.children[0].children,
                                        h = [],
                                        m = [];
                                    for (let e = 0; e < d.length; e++)
                                        if (d[e].nodeType === Node.ELEMENT_NODE) {
                                            const t = Qe(d[e]),
                                                i = t[0],
                                                n = t[1];
                                            m.push(...n), h.push(i)
                                        } n.push({
                                        url: l,
                                        receivedTime: a,
                                        sendingTime: o,
                                        parsed: h,
                                        warnings: m
                                    })
                                }
                                const s = t.value.continue(n);
                                return e(s)
                            }
                        }
                    };
                    (0, a.UT)(t)
                }(_e(s, t, o))
            };
            var et = i(18250),
                tt = i(55106),
                it = i(44277);

            function nt({
                customManifestLoader: e
            }, t) {
                const i = function (e) {
                    return function (t, i, n) {
                        if (void 0 === t) throw new Error("Cannot perform HTTP(s) request. URL not known");
                        switch (e) {
                        case "arraybuffer":
                            return (0, tt.ZP)({
                                url: t,
                                responseType: "arraybuffer",
                                timeout: i.timeout,
                                connectionTimeout: i.connectionTimeout,
                                cancelSignal: n
                            });
                        case "text":
                            return (0, tt.ZP)({
                                url: t,
                                responseType: "text",
                                timeout: i.timeout,
                                connectionTimeout: i.connectionTimeout,
                                cancelSignal: n
                            });
                        case "document":
                            return (0, tt.ZP)({
                                url: t,
                                responseType: "document",
                                timeout: i.timeout,
                                connectionTimeout: i.connectionTimeout,
                                cancelSignal: n
                            });
                        default:
                            (0, a.UT)(e)
                        }
                    }
                }(t);
                return "function" != typeof e ? i : (0, it.Z)(e, i)
            }
            var st = i(54561),
                at = i(7464);

            function rt(e) {
                const t = e.referenceDateTime,
                    i = void 0 !== e.serverSyncInfos ? e.serverSyncInfos.serverTimestamp - e.serverSyncInfos.clientTime : void 0;
                return function (n, s, a, r, c) {
                    var u;
                    const d = n.responseData,
                        h = s.externalClockOffset,
                        m = null !== (u = n.url) && void 0 !== u ? u : s.originalUrl,
                        f = null != i ? i : h,
                        p = {
                            unsafelyBaseOnPreviousManifest: s.unsafeMode ? s.previousManifest : null,
                            url: m,
                            referenceDateTime: t,
                            externalClockOffset: f
                        },
                        g = et.Z.dashParsers;
                    if (null === g.wasm || "uninitialized" === g.wasm.status || "failure" === g.wasm.status) return l.Z.debug("DASH: WASM MPD Parser not initialized. Running JS one."), v(); {
                        const e = function (e) {
                            if (e instanceof ArrayBuffer) return e;
                            if ("string" == typeof e) return (0, k.tG)(e).buffer;
                            if (e instanceof Document) return (0, k.tG)(e.documentElement.innerHTML).buffer;
                            throw new Error("DASH Manifest Parser: Unrecognized Manifest format")
                        }(d);
                        if (! function (e) {
                                const t = new DataView(e);
                                if (61371 === t.getUint16(0) && 191 === t.getUint8(2)) return !0;
                                if (65279 === t.getUint16(0) || 65534 === t.getUint16(0)) return !1;
                                return !0
                            }(e)) return l.Z.info("DASH: MPD doesn't seem to be UTF-8-encoded. Running JS parser instead of the WASM one."), v();
                        if ("initialized" === g.wasm.status) {
                            l.Z.debug("DASH: Running WASM MPD Parser.");
                            return y(g.wasm.runWasmParser(e, p))
                        }
                        l.Z.debug("DASH: Awaiting WASM initialization before parsing the MPD.");
                        return g.wasm.waitForInitialization().catch((() => {})).then((() => {
                            if (null === g.wasm || "initialized" !== g.wasm.status) return l.Z.warn("DASH: WASM MPD parser initialization failed. Running JS parser instead"), v();
                            l.Z.debug("DASH: Running WASM MPD Parser.");
                            return y(g.wasm.runWasmParser(e, p))
                        }))
                    }

                    function v() {
                        if (null === g.js) throw new Error("No MPD parser is imported");
                        const e = function (e) {
                            if (e instanceof ArrayBuffer) return (new DOMParser).parseFromString((0, k.uR)(new Uint8Array(e)), "text/xml");
                            if ("string" == typeof e) return (new DOMParser).parseFromString(e, "text/xml");
                            if (e instanceof Document) return e;
                            throw new Error("DASH Manifest Parser: Unrecognized Manifest format")
                        }(d);
                        return y(g.js(e, p))
                    }

                    function y(t) {
                        if ("done" === t.type) {
                            if (t.value.warnings.length > 0 && a(t.value.warnings), r.isCancelled()) return Promise.reject(r.cancellationError);
                            const i = [];
                            return {
                                manifest: new at.ZP(t.value.parsed, e, i),
                                url: m,
                                warnings: i
                            }
                        }
                        const i = t.value,
                            n = i.urls.map((e => c((() => {
                                const t = o.Z.getCurrent().DEFAULT_REQUEST_TIMEOUT,
                                    n = o.Z.getCurrent().DEFAULT_CONNECTION_TIMEOUT;
                                return "string" === i.format ? (0, tt.ZP)({
                                    url: e,
                                    responseType: "text",
                                    timeout: t,
                                    connectionTimeout: n,
                                    cancelSignal: r
                                }) : (0, tt.ZP)({
                                    url: e,
                                    responseType: "arraybuffer",
                                    timeout: t,
                                    connectionTimeout: n,
                                    cancelSignal: r
                                })
                            })).then((e => {
                                if ("string" === i.format) {
                                    if ("string" != typeof e.responseData) throw new Error("External DASH resources should have been a string");
                                    return (0, Z.Z)(e, {
                                        responseData: {
                                            success: !0,
                                            data: e.responseData
                                        }
                                    })
                                }
                                if (!(e.responseData instanceof ArrayBuffer)) throw new Error("External DASH resources should have been ArrayBuffers");
                                return (0, Z.Z)(e, {
                                    responseData: {
                                        success: !0,
                                        data: e.responseData
                                    }
                                })
                            }), (e => {
                                const t = (0, st.Z)(e, {
                                    defaultCode: "PIPELINE_PARSE_ERROR",
                                    defaultReason: "An unknown error occured when parsing ressources."
                                });
                                return (0, Z.Z)({}, {
                                    size: void 0,
                                    requestDuration: void 0,
                                    responseData: {
                                        success: !1,
                                        error: t
                                    }
                                })
                            }))));
                        return Promise.all(n).then((e => (i.format, y(i.continue(e)))))
                    }
                }
            }
            var ot = i(43989),
                lt = i(52954),
                ct = i.n(lt),
                ut = i(85508),
                dt = i(19053);
            const ht = "function" == typeof Headers ? Headers : null,
                mt = "function" == typeof AbortController ? AbortController : null;

            function ft() {
                return "function" == typeof ut.Z.fetch && !(0, r.Z)(mt) && !(0, r.Z)(ht)
            }
            var pt = i(75797);

            function gt([e, t]) {
                return t === 1 / 0 ? `bytes=${e}-` : `bytes=${e}-${t}`
            }
            var vt = i(74419),
                yt = i(64361),
                bt = i(69294),
                Tt = i(70055);

            function kt(e, t) {
                const i = e.length;
                let n = 0;
                for (; n + 8 <= i;) {
                    let s = (0, Tt.pX)(e, n);
                    if (0 === s) s = i - n;
                    else if (1 === s) {
                        if (n + 16 > i) return -1;
                        s = (0, Tt.pV)(e, n + 8)
                    }
                    if (isNaN(s) || s <= 0) return -1;
                    if ((0, Tt.pX)(e, n + 4) === t) return n + s <= i ? n : -1;
                    n += s
                }
                return -1
            }

            function _t(e, t) {
                if (t) {
                    if (kt(e, 1718909296) < 0) throw new bt.Z("INTEGRITY_ERROR", "Incomplete `ftyp` box");
                    if (kt(e, 1836019574) < 0) throw new bt.Z("INTEGRITY_ERROR", "Incomplete `moov` box")
                } else {
                    if (kt(e, 1836019558) < 0) throw new bt.Z("INTEGRITY_ERROR", "Incomplete `moof` box");
                    if (kt(e, 1835295092) < 0) throw new bt.Z("INTEGRITY_ERROR", "Incomplete `mdat` box")
                }
            }

            function St(e) {
                return (t, i, n, s, a) => {
                    return new Promise(((o, l) => {
                        const c = new yt.ZP,
                            u = c.linkToSignal(s);

                        function d() {
                            c.signal.deregister(l), u()
                        }
                        c.signal.register(l), e(t, i, n, c.signal, Object.assign(Object.assign({}, a), {
                            onNewChunk(e) {
                                try {
                                    r(e), a.onNewChunk(e)
                                } catch (e) {
                                    d(), c.cancel(), l(e)
                                }
                            }
                        })).then((e => {
                            if (d(), !c.isUsed()) {
                                if ("segment-loaded" === e.resultType) try {
                                    r(e.resultData.responseData)
                                } catch (e) {
                                    return void l(e)
                                }
                                o(e)
                            }
                        }), (e => {
                            d(), l(e)
                        }))
                    }));

                    function r(e) {
                        (e instanceof ArrayBuffer || e instanceof Uint8Array) && "mp4" === (0, vt.Z)(i.type, i.mimeType) && _t(new Uint8Array(e), i.segment.isInit)
                    }
                }
            }

            function wt(e, t) {
                return null === e ? null : null === t.url ? e.baseUrl : (0, d.Z)(e.baseUrl, t.url)
            }

            function Et(e, t, i, n, s) {
                if (void 0 === t.range) return (0, tt.ZP)({
                    url: e,
                    responseType: "arraybuffer",
                    timeout: i.timeout,
                    connectionTimeout: i.connectionTimeout,
                    cancelSignal: n,
                    onProgress: s.onProgress
                }).then((e => ({
                    resultType: "segment-loaded",
                    resultData: e
                })));
                if (void 0 === t.indexRange) return (0, tt.ZP)({
                    url: e,
                    headers: {
                        Range: gt(t.range)
                    },
                    responseType: "arraybuffer",
                    timeout: i.timeout,
                    connectionTimeout: i.connectionTimeout,
                    cancelSignal: n,
                    onProgress: s.onProgress
                }).then((e => ({
                    resultType: "segment-loaded",
                    resultData: e
                })));
                if (t.range[1] + 1 === t.indexRange[0]) return (0, tt.ZP)({
                    url: e,
                    headers: {
                        Range: gt([t.range[0], t.indexRange[1]])
                    },
                    responseType: "arraybuffer",
                    timeout: i.timeout,
                    connectionTimeout: i.connectionTimeout,
                    cancelSignal: n,
                    onProgress: s.onProgress
                }).then((e => ({
                    resultType: "segment-loaded",
                    resultData: e
                })));
                const a = (0, tt.ZP)({
                        url: e,
                        headers: {
                            Range: gt(t.range)
                        },
                        responseType: "arraybuffer",
                        timeout: i.timeout,
                        connectionTimeout: i.connectionTimeout,
                        cancelSignal: n,
                        onProgress: s.onProgress
                    }),
                    r = (0, tt.ZP)({
                        url: e,
                        headers: {
                            Range: gt(t.indexRange)
                        },
                        responseType: "arraybuffer",
                        timeout: i.timeout,
                        connectionTimeout: i.connectionTimeout,
                        cancelSignal: n,
                        onProgress: s.onProgress
                    });
                return Promise.all([a, r]).then((([t, i]) => {
                    const n = (0, Tt.zo)(new Uint8Array(t.responseData), new Uint8Array(i.responseData)),
                        s = Math.min(t.sendingTime, i.sendingTime),
                        a = Math.max(t.receivedTime, i.receivedTime);
                    return {
                        resultType: "segment-loaded",
                        resultData: {
                            url: e,
                            responseData: n,
                            size: t.size + i.size,
                            requestDuration: a - s,
                            sendingTime: s,
                            receivedTime: a
                        }
                    }
                }))
            }

            function Dt(e, t, i, n, s) {
                const a = t.segment,
                    o = void 0 !== a.range ? {
                        Range: gt(a.range)
                    } : void 0;
                let c = null;
                return function (e) {
                    let t;
                    if (!(0, r.Z)(e.headers))
                        if ((0, r.Z)(ht)) t = e.headers;
                        else {
                            t = new ht;
                            const i = Object.keys(e.headers);
                            for (let n = 0; n < i.length; n++) {
                                const s = i[n];
                                t.append(s, e.headers[s])
                            }
                        } l.Z.debug("Fetch: Called with URL", e.url);
                    let i = null,
                        n = !1,
                        s = !1;
                    const a = (0, u.Z)(),
                        o = (0, r.Z)(mt) ? null : new mt;

                    function c() {
                        (0, r.Z)(o) ? l.Z.warn("Fetch: AbortController API not available."): o.abort()
                    }
                    let d, h;
                    void 0 !== e.timeout && (d = setTimeout((() => {
                        n = !0, void 0 !== h && clearTimeout(h), c()
                    }), e.timeout)), void 0 !== e.connectionTimeout && (h = setTimeout((() => {
                        s = !0, void 0 !== d && clearTimeout(d), c()
                    }), e.connectionTimeout));
                    const m = e.cancelSignal.register((function (e) {
                            i = e, c()
                        })),
                        f = {
                            method: "GET"
                        };
                    return void 0 !== t && (f.headers = t), f.signal = (0, r.Z)(o) ? null : o.signal, fetch(e.url, f).then((t => {
                        if (void 0 !== h && clearTimeout(h), t.status >= 300) throw l.Z.warn("Fetch: Request HTTP Error", t.status, t.url), new dt.Z(t.url, t.status, dt.S.ERROR_HTTP_CODE);
                        if ((0, r.Z)(t.body)) throw new dt.Z(t.url, t.status, dt.S.PARSE_ERROR);
                        const i = t.headers.get("Content-Length"),
                            n = (0, r.Z)(i) || isNaN(+i) ? void 0 : +i,
                            s = t.body.getReader();
                        let o = 0;
                        return c();

                        function c() {
                            return f.apply(this, arguments)
                        }

                        function f() {
                            return (f = ct()((function* () {
                                const i = yield s.read();
                                if (!i.done && !(0, r.Z)(i.value)) {
                                    o += i.value.byteLength;
                                    const s = (0, u.Z)(),
                                        r = {
                                            url: t.url,
                                            currentTime: s,
                                            duration: s - a,
                                            sendingTime: a,
                                            chunkSize: i.value.byteLength,
                                            chunk: i.value.buffer,
                                            size: o,
                                            totalSize: n
                                        };
                                    return e.onData(r), c()
                                }
                                if (i.done) {
                                    void 0 !== d && clearTimeout(d), m();
                                    const e = (0, u.Z)();
                                    return {
                                        requestDuration: e - a,
                                        receivedTime: e,
                                        sendingTime: a,
                                        size: o,
                                        status: t.status,
                                        url: t.url
                                    }
                                }
                                return c()
                            }))).apply(this, arguments)
                        }
                    })).catch((t => {
                        if (null !== i) throw i;
                        if (m(), n) throw l.Z.warn("Fetch: Request timed out."), new dt.Z(e.url, 0, dt.S.TIMEOUT);
                        if (s) throw l.Z.warn("Fetch: Request connection timed out."), new dt.Z(e.url, 0, dt.S.TIMEOUT);
                        if (t instanceof dt.Z) throw t;
                        throw l.Z.warn("Fetch: Request Error", t instanceof Error ? t.toString() : ""), new dt.Z(e.url, 0, dt.S.ERROR_EVENT)
                    }))
                }({
                    url: e,
                    headers: o,
                    onData: function (e) {
                        const t = new Uint8Array(e.chunk),
                            i = function (e) {
                                let t = 0;
                                const i = [];
                                let n = null;
                                for (; t < e.length;) {
                                    n = e.subarray(t, 1 / 0);
                                    const s = kt(n, 1836019558);
                                    if (s < 0) break;
                                    const a = t + s + (0, Tt.pX)(e, s + t);
                                    if (a > e.length) break;
                                    const r = kt(n, 1835295092);
                                    if (r < 0) break;
                                    const o = t + r + (0, Tt.pX)(e, r + t);
                                    if (o > e.length) break;
                                    const l = Math.max(a, o),
                                        c = e.subarray(t, l);
                                    i.push(c), t = l
                                }
                                return 0 === i.length ? [null, n] : [(0, Tt.zo)(...i), n]
                            }(null !== c ? (0, Tt.zo)(c, t) : t),
                            a = i[0];
                        c = i[1], null !== a && (n.onNewChunk(a), s.isCancelled()) || (n.onProgress({
                            duration: e.duration,
                            size: e.size,
                            totalSize: e.totalSize
                        }), s.isCancelled())
                    },
                    timeout: i.timeout,
                    cancelSignal: s
                }).then((e => ({
                    resultType: "chunk-complete",
                    resultData: e
                })))
            }

            function xt(e, t, i, n, s, a) {
                if (t.segment.isInit) return Et(e, t.segment, n, a, s);
                const r = (0, vt.Z)(t.type, t.mimeType);
                if (i && ("mp4" === r || void 0 === r)) {
                    if (ft()) return Dt(e, t, n, s, a);
                    (0, pt.Z)("DASH: Your browser does not have the fetch API. You will have a higher chance of rebuffering when playing close to the live edge")
                }
                const o = t.segment;
                return (0, tt.ZP)({
                    url: e,
                    responseType: "arraybuffer",
                    headers: void 0 !== o.range ? {
                        Range: gt(o.range)
                    } : void 0,
                    timeout: n.timeout,
                    connectionTimeout: n.connectionTimeout,
                    cancelSignal: a,
                    onProgress: s.onProgress
                }).then((e => ({
                    resultType: "segment-loaded",
                    resultData: e
                })))
            }
            var Pt = i(22503),
                Zt = i(92152),
                It = i(35547),
                Ct = i(91309);

            function Rt(e, t) {
                if (0 === e.length) return;
                const i = e.reduce(((e, t) => ("urn:mpeg:dash:event:2012" === t.schemeIdUri && "1" === t.value ? (void 0 === e.manifestRefreshEventsFromEMSGs && (e.manifestRefreshEventsFromEMSGs = []), e.manifestRefreshEventsFromEMSGs.push(t)) : (void 0 === e.EMSGs && (e.EMSGs = []), e.EMSGs.push(t)), e)), {
                        manifestRefreshEventsFromEMSGs: void 0,
                        EMSGs: void 0
                    }),
                    n = i.manifestRefreshEventsFromEMSGs,
                    s = i.EMSGs,
                    a = null == s ? void 0 : s.map((e => ({
                        type: "emsg",
                        value: e
                    }))),
                    r = void 0 !== t && void 0 !== n && function (e, t) {
                        if (e.length <= 0) return !1;
                        const i = e.length;
                        for (let n = 0; n < i; n++) {
                            const i = t,
                                s = e[n].messageData,
                                a = (0, k.uR)(s),
                                r = Date.parse(a);
                            if (void 0 === i || void 0 === r || isNaN(r) || r >= i) return !0
                        }
                        return !1
                    }(n, t);
                return {
                    inbandEvents: a,
                    needsManifestRefresh: r
                }
            }
            var At = i(24254);

            function Mt({
                __priv_patchLastSegmentInSidx: e
            }) {
                return function (t, i, n) {
                    var s;
                    const a = i.periodStart,
                        r = i.periodEnd,
                        o = i.segment,
                        l = t.data,
                        c = t.isChunked;
                    if (null === l) return o.isInit ? {
                        segmentType: "init",
                        initializationData: null,
                        initializationDataSize: 0,
                        protectionData: [],
                        initTimescale: void 0
                    } : {
                        segmentType: "media",
                        chunkData: null,
                        chunkSize: 0,
                        chunkInfos: null,
                        chunkOffset: null !== (s = o.timestampOffset) && void 0 !== s ? s : 0,
                        protectionData: [],
                        appendWindow: [a, r]
                    };
                    const u = (0, vt.Z)(i.type, i.mimeType);
                    if ("webm" === u) throw new Error("Text tracks with a WEBM container are not yet handled.");
                    return "mp4" === u ? function (e, t, i, n, s) {
                        var a;
                        const r = i.segment,
                            o = r.isInit,
                            l = r.indexRange;
                        let c;
                        if (c = "string" == typeof e ? (0, k.tG)(e) : e instanceof Uint8Array ? e : new Uint8Array(e), o) {
                            const e = (0, Zt.Wf)(c, Array.isArray(l) ? l[0] : 0);
                            if (!0 === s && null !== e && e.length > 0) {
                                const t = e[e.length - 1];
                                Array.isArray(t.range) && (t.range[1] = 1 / 0)
                            }
                            return {
                                segmentType: "init",
                                initializationData: null,
                                initializationDataSize: 0,
                                protectionData: [],
                                initTimescale: (0, Zt.LD)(c),
                                segmentList: null != e ? e : void 0
                            }
                        }
                        const u = (0, Ct.Z)(c, t, r, n),
                            d = (0, At.r8)(i, c, u, t),
                            h = null !== (a = r.timestampOffset) && void 0 !== a ? a : 0;
                        return {
                            segmentType: "media",
                            chunkData: d,
                            chunkSize: c.length,
                            chunkInfos: u,
                            chunkOffset: h,
                            protectionData: [],
                            appendWindow: [i.periodStart, i.periodEnd]
                        }
                    }(l, c, i, n, e) : function (e, t, i) {
                        const n = i.periodStart,
                            s = i.periodEnd,
                            a = i.segment,
                            r = a.timestampOffset,
                            o = void 0 === r ? 0 : r;
                        if (a.isInit) return {
                            segmentType: "init",
                            initializationData: null,
                            initializationDataSize: 0,
                            protectionData: [],
                            initTimescale: void 0
                        };
                        let l, c;
                        if ("string" != typeof e) {
                            const t = e instanceof Uint8Array ? e : new Uint8Array(e);
                            l = (0, k.uR)(t), c = t.length
                        } else l = e;
                        return {
                            segmentType: "media",
                            chunkData: (0, At.yu)(i, l, t),
                            chunkSize: c,
                            chunkInfos: null,
                            chunkOffset: o,
                            protectionData: [],
                            appendWindow: [n, s]
                        }
                    }(l, c, i)
                }
            }
            const Nt = function (e) {
                const t = nt({
                        customManifestLoader: e.manifestLoader
                    }, null === et.Z.dashParsers.wasm || "initialized" !== et.Z.dashParsers.wasm.status && "initializing" !== et.Z.dashParsers.wasm.status ? "arraybuffer" : "text"),
                    i = rt(e),
                    n = function ({
                        lowLatencyMode: e,
                        segmentLoader: t,
                        checkMediaSegmentIntegrity: i
                    }) {
                        return !0 !== i ? n : St(n);

                        function n(i, n, s, a, r) {
                            const o = wt(i, n.segment);
                            return null === o ? Promise.resolve({
                                resultType: "segment-created",
                                resultData: null
                            }) : e || void 0 === t ? xt(o, n, e, s, r, a) : new Promise(((i, l) => {
                                let c = !1;
                                const u = {
                                    reject: e => {
                                        var t, i;
                                        if (c || a.isCancelled()) return;
                                        c = !0, a.deregister(f);
                                        const n = e,
                                            s = null !== (t = null == n ? void 0 : n.message) && void 0 !== t ? t : "Unknown error when fetching a DASH segment through a custom segmentLoader.",
                                            r = new ot.Z(s, null !== (i = null == n ? void 0 : n.canRetry) && void 0 !== i && i, null == n ? void 0 : n.xhr);
                                        l(r)
                                    },
                                    resolve: e => {
                                        c || a.isCancelled() || (c = !0, a.deregister(f), i({
                                            resultType: "segment-loaded",
                                            resultData: {
                                                responseData: e.data,
                                                size: e.size,
                                                requestDuration: e.duration
                                            }
                                        }))
                                    },
                                    progress: e => {
                                        c || a.isCancelled() || r.onProgress({
                                            duration: e.duration,
                                            size: e.size,
                                            totalSize: e.totalSize
                                        })
                                    },
                                    fallback: () => {
                                        c || a.isCancelled() || (c = !0, a.deregister(f), xt(o, n, e, s, r, a).then(i, l))
                                    }
                                };
                                let d;
                                void 0 !== n.segment.range && (d = [n.segment.range], void 0 !== n.segment.indexRange && d.push(n.segment.indexRange));
                                const h = {
                                        isInit: n.segment.isInit,
                                        timeout: s.timeout,
                                        byteRanges: d,
                                        trackType: n.type,
                                        url: o
                                    },
                                    m = t(h, u);

                                function f(e) {
                                    c || (c = !0, "function" == typeof m && m(), l(e))
                                }
                                a.register(f)
                            }))
                        }
                    }(e),
                    s = function ({
                        __priv_patchLastSegmentInSidx: e
                    }) {
                        return function (t, i, n) {
                            var s, a;
                            const o = i.segment,
                                l = i.periodStart,
                                c = i.periodEnd,
                                u = t.data,
                                d = t.isChunked,
                                h = [l, c];
                            if (null === u) return o.isInit ? {
                                segmentType: "init",
                                initializationData: null,
                                initializationDataSize: 0,
                                protectionData: [],
                                initTimescale: void 0
                            } : {
                                segmentType: "media",
                                chunkData: null,
                                chunkSize: 0,
                                chunkInfos: null,
                                chunkOffset: 0,
                                protectionData: [],
                                appendWindow: h
                            };
                            const m = u instanceof Uint8Array ? u : new Uint8Array(u),
                                f = (0, vt.Z)(i.type, i.mimeType),
                                p = "mp4" === f || void 0 === f,
                                g = [];
                            if (p) {
                                const e = (0, Pt.Z)(m);
                                let t;
                                o.isInit && (t = null !== (s = (0, Zt.R0)(m)) && void 0 !== s ? s : void 0), (e.length > 0 || void 0 !== t) && g.push({
                                    initDataType: "cenc",
                                    keyId: t,
                                    initData: e
                                })
                            }
                            if (!o.isInit) {
                                const e = p ? (0, Ct.Z)(m, d, o, n) : null,
                                    t = null !== (a = o.timestampOffset) && void 0 !== a ? a : 0;
                                if (p) {
                                    const n = (0, Zt.s9)(m);
                                    if (void 0 !== n) {
                                        const s = Rt(n.filter((e => void 0 !== o.privateInfos && void 0 !== o.privateInfos.isEMSGWhitelisted && o.privateInfos.isEMSGWhitelisted(e))), i.manifestPublishTime);
                                        if (void 0 !== s) {
                                            const i = s.needsManifestRefresh,
                                                n = s.inbandEvents;
                                            return {
                                                segmentType: "media",
                                                chunkData: m,
                                                chunkSize: m.length,
                                                chunkInfos: e,
                                                chunkOffset: t,
                                                appendWindow: h,
                                                inbandEvents: n,
                                                protectionData: g,
                                                needsManifestRefresh: i
                                            }
                                        }
                                    }
                                }
                                return {
                                    segmentType: "media",
                                    chunkData: m,
                                    chunkSize: m.length,
                                    chunkInfos: e,
                                    chunkOffset: t,
                                    protectionData: g,
                                    appendWindow: h
                                }
                            }
                            const v = o.indexRange;
                            let y, b;
                            if ("webm" === f) y = (0, It.$)(m, 0);
                            else if (p && (y = (0, Zt.Wf)(m, Array.isArray(v) ? v[0] : 0), !0 === e && null !== y && y.length > 0)) {
                                const e = y[y.length - 1];
                                Array.isArray(e.range) && (e.range[1] = 1 / 0)
                            }
                            p ? b = (0, Zt.LD)(m) : "webm" === f && (b = (0, It.i)(m, 0));
                            const T = (0, r.Z)(b) ? void 0 : b;
                            return {
                                segmentType: "init",
                                initializationData: m,
                                initializationDataSize: m.length,
                                protectionData: g,
                                initTimescale: T,
                                segmentList: null != y ? y : void 0
                            }
                        }
                    }(e),
                    a = function ({
                        lowLatencyMode: e,
                        checkMediaSegmentIntegrity: t
                    }) {
                        return !0 !== t ? i : St(i);

                        function i(t, i, n, s, a) {
                            const r = i.segment,
                                o = r.range,
                                l = wt(t, r);
                            if (null === l) return Promise.resolve({
                                resultType: "segment-created",
                                resultData: null
                            });
                            if (r.isInit) return Et(l, r, n, s, a);
                            const c = (0, vt.Z)(i.type, i.mimeType),
                                u = "mp4" === c || void 0 === c;
                            if (e && u) {
                                if (ft()) return Dt(l, i, n, a, s);
                                (0, pt.Z)("DASH: Your browser does not have the fetch API. You will have a higher chance of rebuffering when playing close to the live edge")
                            }
                            return u ? (0, tt.ZP)({
                                url: l,
                                responseType: "arraybuffer",
                                headers: Array.isArray(o) ? {
                                    Range: gt(o)
                                } : null,
                                timeout: n.timeout,
                                connectionTimeout: n.connectionTimeout,
                                onProgress: a.onProgress,
                                cancelSignal: s
                            }).then((e => ({
                                resultType: "segment-loaded",
                                resultData: e
                            }))) : (0, tt.ZP)({
                                url: l,
                                responseType: "text",
                                headers: Array.isArray(o) ? {
                                    Range: gt(o)
                                } : null,
                                timeout: n.timeout,
                                connectionTimeout: n.connectionTimeout,
                                onProgress: a.onProgress,
                                cancelSignal: s
                            }).then((e => ({
                                resultType: "segment-loaded",
                                resultData: e
                            })))
                        }
                    }(e);
                return {
                    manifest: {
                        loadManifest: t,
                        parseManifest: i
                    },
                    audio: {
                        loadSegment: n,
                        parseSegment: s
                    },
                    video: {
                        loadSegment: n,
                        parseSegment: s
                    },
                    text: {
                        loadSegment: a,
                        parseSegment: Mt(e)
                    }
                }
            };

            function Lt(e) {
                void 0 === e.transports.dash && (e.transports.dash = Nt), e.dashParsers.js = Je, e.mainThreadMediaSourceInit = n.Z, e.codecSupportProber = s.Z
            }
            var Ut = i(26741),
                Ot = i(79874);

            function zt(e, t, i, n) {
                const s = new Uint8Array(t, i, n);
                return e.decode(s)
            }

            function Kt(e) {
                return e === 1 / 0 || e !== -1 / 0 && e
            }

            function Ft(e, t) {
                const i = new TextDecoder;
                return function (n, s, a) {
                    64 === n && (e.value = zt(i, t.buffer, s, a))
                }
            }

            function Bt(e, t) {
                const i = e.attributes,
                    n = e.children,
                    s = new TextDecoder;
                return function (e, a, r) {
                    switch (e) {
                    case 16:
                        i.schemeIdUri = zt(s, t.buffer, a, r);
                        break;
                    case 13:
                        i.value = zt(s, t.buffer, a, r);
                        break;
                    case 14:
                        const e = zt(s, t.buffer, a, r);
                        i.keyId = (0, k.nr)(e.replace(/-/g, ""));
                        break;
                    case 15:
                        try {
                            const e = zt(s, t.buffer, a, r);
                            n.cencPssh.push((0, Ee.K)(e))
                        } catch (e) {}
                    }
                }
            }

            function Vt(e, t) {
                const i = new TextDecoder;
                return function (n, s, a) {
                    switch (n) {
                    case 16:
                        e.schemeIdUri = zt(i, t.buffer, s, a);
                        break;
                    case 17:
                        e.value = zt(i, t.buffer, s, a)
                    }
                }
            }

            function Ht(e, t) {
                const i = new TextDecoder;
                return function (n, s, a) {
                    switch (n) {
                    case 29: {
                        const i = new DataView(t.buffer);
                        void 0 === e.initialization && (e.initialization = {}), e.initialization.range = [i.getFloat64(s, !0), i.getFloat64(s + 8, !0)];
                        break
                    }
                    case 67:
                        void 0 === e.initialization && (e.initialization = {}), e.initialization.media = zt(i, t.buffer, s, a);
                        break;
                    case 43: {
                        const i = new DataView(t.buffer);
                        e.availabilityTimeOffset = i.getFloat64(s, !0);
                        break
                    }
                    case 22:
                        e.availabilityTimeComplete = 0 === new DataView(t.buffer).getUint8(0);
                        break;
                    case 24: {
                        const i = new DataView(t.buffer);
                        e.presentationTimeOffset = i.getFloat64(s, !0);
                        break
                    }
                    case 27: {
                        const i = new DataView(t.buffer);
                        e.timescale = i.getFloat64(s, !0);
                        break
                    }
                    case 31: {
                        const i = new DataView(t.buffer);
                        e.indexRange = [i.getFloat64(s, !0), i.getFloat64(s + 8, !0)];
                        break
                    }
                    case 23:
                        e.indexRangeExact = 0 === new DataView(t.buffer).getUint8(0);
                        break;
                    case 1: {
                        const i = new DataView(t.buffer);
                        e.duration = i.getFloat64(s, !0);
                        break
                    }
                    case 20: {
                        const i = new DataView(t.buffer);
                        e.startNumber = i.getFloat64(s, !0);
                        break
                    }
                    case 76: {
                        const i = new DataView(t.buffer);
                        e.endNumber = i.getFloat64(s, !0);
                        break
                    }
                    }
                }
            }

            function Wt(e, t, i) {
                return function (n) {
                    switch (n) {
                    case 20: {
                        const s = {};
                        void 0 === e.list && (e.list = []), e.list.push(s);
                        const a = function (e, t) {
                            const i = new TextDecoder;
                            return function (n, s, a) {
                                switch (n) {
                                case 28:
                                    e.index = zt(i, t.buffer, s, a);
                                    break;
                                case 31: {
                                    const i = new DataView(t.buffer);
                                    e.indexRange = [i.getFloat64(s, !0), i.getFloat64(s + 8, !0)];
                                    break
                                }
                                case 30:
                                    e.media = zt(i, t.buffer, s, a);
                                    break;
                                case 18: {
                                    const i = new DataView(t.buffer);
                                    e.mediaRange = [i.getFloat64(s, !0), i.getFloat64(s + 8, !0)];
                                    break
                                }
                                }
                            }
                        }(s, t);
                        i.pushParsers(n, Ot.Z, a);
                        break
                    }
                    default:
                        i.pushParsers(n, Ot.Z, Ot.Z)
                    }
                }
            }

            function $t(e, t) {
                const i = new TextDecoder;
                return function (n, s, a) {
                    switch (n) {
                    case 19: {
                        const i = new DataView(t.buffer);
                        e.timeline = [];
                        let n = s;
                        for (let t = 0; t < a / 24; t++) e.timeline.push({
                            start: i.getFloat64(n, !0),
                            duration: i.getFloat64(n + 8, !0),
                            repeatCount: i.getFloat64(n + 16, !0)
                        }), n += 24;
                        break
                    }
                    case 67:
                        e.initialization = {
                            media: zt(i, t.buffer, s, a)
                        };
                        break;
                    case 28:
                        e.index = zt(i, t.buffer, s, a);
                        break;
                    case 43: {
                        const i = new DataView(t.buffer);
                        e.availabilityTimeOffset = i.getFloat64(s, !0);
                        break
                    }
                    case 22:
                        e.availabilityTimeComplete = 0 === new DataView(t.buffer).getUint8(0);
                        break;
                    case 24: {
                        const i = new DataView(t.buffer);
                        e.presentationTimeOffset = i.getFloat64(s, !0);
                        break
                    }
                    case 27: {
                        const i = new DataView(t.buffer);
                        e.timescale = i.getFloat64(s, !0);
                        break
                    }
                    case 31: {
                        const i = new DataView(t.buffer);
                        e.indexRange = [i.getFloat64(s, !0), i.getFloat64(s + 8, !0)];
                        break
                    }
                    case 23:
                        e.indexRangeExact = 0 === new DataView(t.buffer).getUint8(0);
                        break;
                    case 30:
                        e.media = zt(i, t.buffer, s, a);
                        break;
                    case 32:
                        e.bitstreamSwitching = 0 === new DataView(t.buffer).getUint8(0);
                        break;
                    case 1: {
                        const i = new DataView(t.buffer);
                        e.duration = i.getFloat64(s, !0);
                        break
                    }
                    case 20: {
                        const i = new DataView(t.buffer);
                        e.startNumber = i.getFloat64(s, !0);
                        break
                    }
                    case 76: {
                        const i = new DataView(t.buffer);
                        e.endNumber = i.getFloat64(s, !0);
                        break
                    }
                    }
                }
            }

            function Gt(e, t, i) {
                return function (n) {
                    switch (n) {
                    case 8: {
                        const s = {};
                        void 0 === e.accessibilities && (e.accessibilities = []), e.accessibilities.push(s);
                        const a = Vt(s, t);
                        i.pushParsers(n, Ot.Z, a);
                        break
                    }
                    case 15: {
                        const s = {
                            value: "",
                            attributes: {}
                        };
                        e.baseURLs.push(s);
                        const a = Ft(s, t);
                        i.pushParsers(n, Ot.Z, a);
                        break
                    }
                    case 9: {
                        const s = {};
                        e.contentComponent = s, i.pushParsers(n, Ot.Z, function (e, t) {
                            const i = new TextDecoder;
                            return function (n, s, a) {
                                switch (n) {
                                case 0:
                                    e.id = zt(i, t.buffer, s, a);
                                    break;
                                case 60:
                                    e.language = zt(i, t.buffer, s, a);
                                    break;
                                case 61:
                                    e.contentType = zt(i, t.buffer, s, a);
                                    break;
                                case 62:
                                    e.par = zt(i, t.buffer, s, a)
                                }
                            }
                        }(s, t));
                        break
                    }
                    case 10: {
                        const s = {
                            children: {
                                cencPssh: []
                            },
                            attributes: {}
                        };
                        void 0 === e.contentProtections && (e.contentProtections = []), e.contentProtections.push(s);
                        const a = Bt(s, t);
                        i.pushParsers(n, Ot.Z, a);
                        break
                    }
                    case 11: {
                        const s = {};
                        void 0 === e.essentialProperties && (e.essentialProperties = []), e.essentialProperties.push(s);
                        const a = Ot.Z,
                            r = Vt(s, t);
                        i.pushParsers(n, a, r);
                        break
                    }
                    case 19: {
                        const s = {};
                        void 0 === e.inbandEventStreams && (e.inbandEventStreams = []), e.inbandEventStreams.push(s);
                        const a = Ot.Z,
                            r = Vt(s, t);
                        i.pushParsers(n, a, r);
                        break
                    }
                    case 7: {
                        const s = {
                            children: {
                                baseURLs: []
                            },
                            attributes: {}
                        };
                        e.representations.push(s);
                        const a = function (e, t, i) {
                                return function (n) {
                                    switch (n) {
                                    case 15: {
                                        const s = {
                                            value: "",
                                            attributes: {}
                                        };
                                        e.baseURLs.push(s), i.pushParsers(n, Ot.Z, Ft(s, t));
                                        break
                                    }
                                    case 10: {
                                        const s = {
                                            children: {
                                                cencPssh: []
                                            },
                                            attributes: {}
                                        };
                                        void 0 === e.contentProtections && (e.contentProtections = []), e.contentProtections.push(s);
                                        const a = Bt(s, t);
                                        i.pushParsers(n, Ot.Z, a);
                                        break
                                    }
                                    case 19: {
                                        const s = {};
                                        void 0 === e.inbandEventStreams && (e.inbandEventStreams = []), e.inbandEventStreams.push(s), i.pushParsers(n, Ot.Z, Vt(s, t));
                                        break
                                    }
                                    case 13: {
                                        const s = {};
                                        void 0 === e.supplementalProperties && (e.supplementalProperties = []), e.supplementalProperties.push(s);
                                        const a = Vt(s, t);
                                        i.pushParsers(n, Ot.Z, a);
                                        break
                                    }
                                    case 17: {
                                        const s = {};
                                        e.segmentBase = s;
                                        const a = Ht(s, t);
                                        i.pushParsers(n, Ot.Z, a);
                                        break
                                    }
                                    case 18: {
                                        const s = {
                                            list: []
                                        };
                                        e.segmentList = s;
                                        const a = Wt(s, t, i),
                                            r = Ht(s, t);
                                        i.pushParsers(n, a, r);
                                        break
                                    }
                                    case 16: {
                                        const s = {};
                                        e.segmentTemplate = s, i.pushParsers(n, Ot.Z, $t(s, t));
                                        break
                                    }
                                    default:
                                        i.pushParsers(n, Ot.Z, Ot.Z)
                                    }
                                }
                            }(s.children, t, i),
                            r = function (e, t) {
                                const i = new TextDecoder;
                                return function (n, s, a) {
                                    const r = new DataView(t.buffer);
                                    switch (n) {
                                    case 0:
                                        e.id = zt(i, t.buffer, s, a);
                                        break;
                                    case 3:
                                        e.audioSamplingRate = zt(i, t.buffer, s, a);
                                        break;
                                    case 63:
                                        e.bitrate = r.getFloat64(s, !0);
                                        break;
                                    case 4:
                                        e.codecs = zt(i, t.buffer, s, a);
                                        break;
                                    case 77:
                                        e.supplementalCodecs = zt(i, t.buffer, s, a);
                                        break;
                                    case 5:
                                        e.codingDependency = 0 === new DataView(t.buffer).getUint8(0);
                                        break;
                                    case 6:
                                        e.frameRate = r.getFloat64(s, !0);
                                        break;
                                    case 7:
                                        e.height = r.getFloat64(s, !0);
                                        break;
                                    case 8:
                                        e.width = r.getFloat64(s, !0);
                                        break;
                                    case 9:
                                        e.maxPlayoutRate = r.getFloat64(s, !0);
                                        break;
                                    case 10:
                                        e.maximumSAPPeriod = r.getFloat64(s, !0);
                                        break;
                                    case 11:
                                        e.mimeType = zt(i, t.buffer, s, a);
                                        break;
                                    case 2:
                                        e.profiles = zt(i, t.buffer, s, a);
                                        break;
                                    case 65:
                                        e.qualityRanking = r.getFloat64(s, !0);
                                        break;
                                    case 12:
                                        e.segmentProfiles = zt(i, t.buffer, s, a);
                                        break;
                                    case 43:
                                        e.availabilityTimeOffset = r.getFloat64(s, !0);
                                        break;
                                    case 22:
                                        e.availabilityTimeComplete = 0 === r.getUint8(0)
                                    }
                                }
                            }(s.attributes, t);
                        i.pushParsers(n, a, r);
                        break
                    }
                    case 12: {
                        const s = {};
                        void 0 === e.roles && (e.roles = []), e.roles.push(s);
                        const a = Vt(s, t);
                        i.pushParsers(n, Ot.Z, a);
                        break
                    }
                    case 13: {
                        const s = {};
                        void 0 === e.supplementalProperties && (e.supplementalProperties = []), e.supplementalProperties.push(s);
                        const a = Vt(s, t);
                        i.pushParsers(n, Ot.Z, a);
                        break
                    }
                    case 17: {
                        const s = {};
                        e.segmentBase = s;
                        const a = Ht(s, t);
                        i.pushParsers(n, Ot.Z, a);
                        break
                    }
                    case 18: {
                        const s = {
                            list: []
                        };
                        e.segmentList = s;
                        const a = Wt(s, t, i),
                            r = Ht(s, t);
                        i.pushParsers(n, a, r);
                        break
                    }
                    case 16: {
                        const s = {};
                        e.segmentTemplate = s, i.pushParsers(n, Ot.Z, $t(s, t));
                        break
                    }
                    default:
                        i.pushParsers(n, Ot.Z, Ot.Z)
                    }
                }
            }

            function Xt(e, t, i, n) {
                return function (s) {
                    switch (s) {
                    case 6: {
                        const a = {};
                        e.events.push(a);
                        const r = function (e, t, i) {
                            const n = new TextDecoder;
                            return function (s, a, r) {
                                const o = new DataView(t.buffer);
                                switch (s) {
                                case 25:
                                    e.presentationTime = o.getFloat64(a, !0);
                                    break;
                                case 1:
                                    e.duration = o.getFloat64(a, !0);
                                    break;
                                case 0:
                                    e.id = zt(n, t.buffer, a, r);
                                    break;
                                case 69:
                                    const s = o.getFloat64(a, !0),
                                        l = o.getFloat64(a + 8, !0);
                                    e.eventStreamData = i.slice(s, l)
                                }
                            }
                        }(a, t, n);
                        i.pushParsers(s, Ot.Z, r);
                        break
                    }
                    default:
                        i.pushParsers(s, Ot.Z, Ot.Z)
                    }
                }
            }

            function qt(e, t, i, n) {
                return function (s) {
                    switch (s) {
                    case 4: {
                        const n = {
                            children: {
                                baseURLs: [],
                                representations: []
                            },
                            attributes: {}
                        };
                        e.adaptations.push(n);
                        const a = Gt(n.children, t, i),
                            r = function (e, t) {
                                const i = new TextDecoder;
                                return function (n, s, a) {
                                    const r = new DataView(t.buffer);
                                    switch (n) {
                                    case 0:
                                        e.id = zt(i, t.buffer, s, a);
                                        break;
                                    case 48:
                                        e.group = r.getFloat64(s, !0);
                                        break;
                                    case 60:
                                        e.language = zt(i, t.buffer, s, a);
                                        break;
                                    case 61:
                                        e.contentType = zt(i, t.buffer, s, a);
                                        break;
                                    case 62:
                                        e.par = zt(i, t.buffer, s, a);
                                        break;
                                    case 53:
                                        e.minBitrate = r.getFloat64(s, !0);
                                        break;
                                    case 49:
                                        e.maxBitrate = r.getFloat64(s, !0);
                                        break;
                                    case 56:
                                        e.minWidth = r.getFloat64(s, !0);
                                        break;
                                    case 52:
                                        e.maxWidth = r.getFloat64(s, !0);
                                        break;
                                    case 55:
                                        e.minHeight = r.getFloat64(s, !0);
                                        break;
                                    case 51:
                                        e.maxHeight = r.getFloat64(s, !0);
                                        break;
                                    case 54:
                                        e.minFrameRate = r.getFloat64(s, !0);
                                        break;
                                    case 50:
                                        e.maxFrameRate = r.getFloat64(s, !0);
                                        break;
                                    case 57:
                                        e.selectionPriority = r.getFloat64(s, !0);
                                        break;
                                    case 58:
                                        e.segmentAlignment = Kt(r.getFloat64(s, !0));
                                        break;
                                    case 59:
                                        e.subsegmentAlignment = Kt(r.getFloat64(s, !0));
                                        break;
                                    case 32:
                                        e.bitstreamSwitching = 0 !== r.getFloat64(s, !0);
                                        break;
                                    case 3:
                                        e.audioSamplingRate = zt(i, t.buffer, s, a);
                                        break;
                                    case 4:
                                        e.codecs = zt(i, t.buffer, s, a);
                                        break;
                                    case 77:
                                        e.supplementalCodecs = zt(i, t.buffer, s, a);
                                        break;
                                    case 2:
                                        e.profiles = zt(i, t.buffer, s, a);
                                        break;
                                    case 12:
                                        e.segmentProfiles = zt(i, t.buffer, s, a);
                                        break;
                                    case 11:
                                        e.mimeType = zt(i, t.buffer, s, a);
                                        break;
                                    case 5:
                                        e.codingDependency = 0 !== r.getFloat64(s, !0);
                                        break;
                                    case 6:
                                        e.frameRate = r.getFloat64(s, !0);
                                        break;
                                    case 7:
                                        e.height = r.getFloat64(s, !0);
                                        break;
                                    case 8:
                                        e.width = r.getFloat64(s, !0);
                                        break;
                                    case 9:
                                        e.maxPlayoutRate = r.getFloat64(s, !0);
                                        break;
                                    case 10:
                                        e.maximumSAPPeriod = r.getFloat64(s, !0);
                                        break;
                                    case 43:
                                        e.availabilityTimeOffset = r.getFloat64(s, !0);
                                        break;
                                    case 22:
                                        e.availabilityTimeComplete = 0 === r.getUint8(0);
                                        break;
                                    case 71:
                                        const n = zt(i, t.buffer, s, a);
                                        e.label = n
                                    }
                                }
                            }(n.attributes, t);
                        i.pushParsers(s, a, r);
                        break
                    }
                    case 15: {
                        const n = {
                            value: "",
                            attributes: {}
                        };
                        e.baseURLs.push(n);
                        const a = Ot.Z,
                            r = Ft(n, t);
                        i.pushParsers(s, a, r);
                        break
                    }
                    case 5: {
                        const a = {
                            children: {
                                events: []
                            },
                            attributes: {}
                        };
                        e.eventStreams.push(a);
                        const r = Xt(a.children, t, i, n),
                            o = function (e, t) {
                                const i = new TextDecoder;
                                return function (n, s, a) {
                                    const r = new DataView(t.buffer);
                                    switch (n) {
                                    case 16:
                                        e.schemeIdUri = zt(i, t.buffer, s, a);
                                        break;
                                    case 17:
                                        e.value = zt(i, t.buffer, s, a);
                                        break;
                                    case 27:
                                        e.timescale = r.getFloat64(s, !0);
                                        break;
                                    case 70:
                                        const n = {
                                            key: "",
                                            value: ""
                                        };
                                        let o = s;
                                        const l = r.getUint32(o);
                                        o += 4, n.key = zt(i, t.buffer, o, l), o += l;
                                        const c = r.getUint32(o);
                                        o += 4, n.value = zt(i, t.buffer, o, c), void 0 === e.namespaces ? e.namespaces = [n] : e.namespaces.push(n)
                                    }
                                }
                            }(a.attributes, t);
                        i.pushParsers(s, r, o);
                        break
                    }
                    case 16: {
                        const n = {};
                        e.segmentTemplate = n, i.pushParsers(s, Ot.Z, $t(n, t));
                        break
                    }
                    default:
                        i.pushParsers(s, Ot.Z, Ot.Z)
                    }
                }
            }

            function jt(e, t) {
                const i = new TextDecoder;
                return function (n, s, a) {
                    switch (n) {
                    case 0:
                        e.id = zt(i, t.buffer, s, a);
                        break;
                    case 45:
                        e.start = new DataView(t.buffer).getFloat64(s, !0);
                        break;
                    case 1:
                        e.duration = new DataView(t.buffer).getFloat64(s, !0);
                        break;
                    case 32:
                        e.bitstreamSwitching = 0 === new DataView(t.buffer).getUint8(0);
                        break;
                    case 46:
                        e.xlinkHref = zt(i, t.buffer, s, a);
                        break;
                    case 47:
                        e.xlinkActuate = zt(i, t.buffer, s, a);
                        break;
                    case 43:
                        e.availabilityTimeOffset = new DataView(t.buffer).getFloat64(s, !0);
                        break;
                    case 22:
                        e.availabilityTimeComplete = 0 === new DataView(t.buffer).getUint8(0);
                        break;
                    case 70:
                        const n = {
                                key: "",
                                value: ""
                            },
                            r = new DataView(t.buffer);
                        let o = s;
                        const l = r.getUint32(o);
                        o += 4, n.key = zt(i, t.buffer, o, l), o += l;
                        const c = r.getUint32(o);
                        o += 4, n.value = zt(i, t.buffer, o, c), void 0 === e.namespaces ? e.namespaces = [n] : e.namespaces.push(n)
                    }
                }
            }

            function Qt(e, t, i, n) {
                return function (s) {
                    if (1 === s) {
                        e.mpd = {
                            children: {
                                baseURLs: [],
                                locations: [],
                                periods: [],
                                utcTimings: []
                            },
                            attributes: {}
                        };
                        const a = function (e, t, i, n) {
                                return function (s) {
                                    switch (s) {
                                    case 15: {
                                        const n = {
                                            value: "",
                                            attributes: {}
                                        };
                                        e.baseURLs.push(n);
                                        const a = Ot.Z,
                                            r = Ft(n, t);
                                        i.pushParsers(s, a, r);
                                        break
                                    }
                                    case 2: {
                                        const a = {
                                            children: {
                                                adaptations: [],
                                                baseURLs: [],
                                                eventStreams: []
                                            },
                                            attributes: {}
                                        };
                                        e.periods.push(a);
                                        const r = qt(a.children, t, i, n),
                                            o = jt(a.attributes, t);
                                        i.pushParsers(s, r, o);
                                        break
                                    }
                                    case 3: {
                                        const n = {};
                                        e.utcTimings.push(n);
                                        const a = Ot.Z,
                                            r = Vt(n, t);
                                        i.pushParsers(s, a, r);
                                        break
                                    }
                                    default:
                                        i.pushParsers(s, Ot.Z, Ot.Z)
                                    }
                                }
                            }(e.mpd.children, t, i, n),
                            r = function (e, t, i) {
                                let n;
                                const s = new TextDecoder;
                                return function (a, r, o) {
                                    switch (a) {
                                    case 0:
                                        t.id = zt(s, i.buffer, r, o);
                                        break;
                                    case 2:
                                        t.profiles = zt(s, i.buffer, r, o);
                                        break;
                                    case 33:
                                        t.type = zt(s, i.buffer, r, o);
                                        break;
                                    case 34:
                                        const a = zt(s, i.buffer, r, o);
                                        t.availabilityStartTime = new Date(a).getTime() / 1e3;
                                        break;
                                    case 35:
                                        const l = zt(s, i.buffer, r, o);
                                        t.availabilityEndTime = new Date(l).getTime() / 1e3;
                                        break;
                                    case 36:
                                        const c = zt(s, i.buffer, r, o);
                                        t.publishTime = new Date(c).getTime() / 1e3;
                                        break;
                                    case 68:
                                        n = new DataView(i.buffer), t.duration = n.getFloat64(r, !0);
                                        break;
                                    case 37:
                                        n = new DataView(i.buffer), t.minimumUpdatePeriod = n.getFloat64(r, !0);
                                        break;
                                    case 38:
                                        n = new DataView(i.buffer), t.minBufferTime = n.getFloat64(r, !0);
                                        break;
                                    case 39:
                                        n = new DataView(i.buffer), t.timeShiftBufferDepth = n.getFloat64(r, !0);
                                        break;
                                    case 40:
                                        n = new DataView(i.buffer), t.suggestedPresentationDelay = n.getFloat64(r, !0);
                                        break;
                                    case 41:
                                        n = new DataView(i.buffer), t.maxSegmentDuration = n.getFloat64(r, !0);
                                        break;
                                    case 42:
                                        n = new DataView(i.buffer), t.maxSubsegmentDuration = n.getFloat64(r, !0);
                                        break;
                                    case 66:
                                        const u = zt(s, i.buffer, r, o);
                                        e.locations.push(u);
                                        break;
                                    case 70:
                                        const d = {
                                            key: "",
                                            value: ""
                                        };
                                        n = new DataView(i.buffer);
                                        let h = r;
                                        const m = n.getUint32(h);
                                        h += 4, d.key = zt(s, i.buffer, h, m), h += m;
                                        const f = n.getUint32(h);
                                        h += 4, d.value = zt(s, i.buffer, h, f), void 0 === t.namespaces ? t.namespaces = [d] : t.namespaces.push(d)
                                    }
                                }
                            }(e.mpd.children, e.mpd.attributes, t);
                        i.pushParsers(s, a, r)
                    } else i.pushParsers(s, Ot.Z, Ot.Z)
                }
            }
            class Yt {
                constructor() {
                    this._currentNodeId = null, this.childrenParser = Ot.Z, this.attributeParser = Ot.Z, this._stack = [{
                        nodeId: null,
                        children: Ot.Z,
                        attribute: Ot.Z
                    }]
                }
                pushParsers(e, t, i) {
                    this._currentNodeId = e, this.childrenParser = t, this.attributeParser = i, this._stack.push({
                        nodeId: e,
                        attribute: i,
                        children: t
                    })
                }
                popIfCurrent(e) {
                    if (this._currentNodeId !== e) return;
                    this._stack.pop();
                    const t = this._stack[this._stack.length - 1],
                        i = t.nodeId,
                        n = t.children,
                        s = t.attribute;
                    this._currentNodeId = i, this.attributeParser = s, this.childrenParser = n
                }
                reset() {
                    this.childrenParser = Ot.Z, this.attributeParser = Ot.Z, this._stack = [{
                        nodeId: null,
                        children: Ot.Z,
                        attribute: Ot.Z
                    }]
                }
            }
            const Jt = new class {
                    constructor() {
                        this._parsersStack = new Yt, this._instance = null, this._mpdData = null, this._linearMemory = null, this.status = "uninitialized", this._initProm = null, this._warnings = [], this._isParsing = !1
                    }
                    waitForInitialization() {
                        var e;
                        return null !== (e = this._initProm) && void 0 !== e ? e : Promise.reject("No initialization performed yet.")
                    }
                    initialize(e) {
                        var t = this;
                        return ct()((function* () {
                            if ("uninitialized" !== t.status) return Promise.reject(new Error("DashWasmParser already initialized."));
                            if (!t.isCompatible()) return t.status = "failure", Promise.reject(new Error("Target not compatible with WebAssembly."));
                            t.status = "initializing";
                            const i = t._parsersStack,
                                n = new TextDecoder,
                                s = t,
                                a = {
                                    env: {
                                        memoryBase: 0,
                                        tableBase: 0,
                                        memory: new WebAssembly.Memory({
                                            initial: 10
                                        }),
                                        table: new WebAssembly.Table({
                                            initial: 1,
                                            element: "anyfunc"
                                        }),
                                        onTagOpen: function (e) {
                                            return i.childrenParser(e)
                                        },
                                        onCustomEvent: function (e, t, i) {
                                            const a = s._linearMemory,
                                                r = new Uint8Array(a.buffer, t, i);
                                            if (1 === e) {
                                                const e = n.decode(r);
                                                l.Z.warn("WASM Error Event:", e), s._warnings.push(new Error(e))
                                            } else if (0 === e) {
                                                const e = n.decode(r);
                                                l.Z.warn("WASM Log Event:", e)
                                            }
                                        },
                                        onAttribute: function (e, t, n) {
                                            return i.attributeParser(e, t, n)
                                        },
                                        readNext: function (e, t) {
                                            if (null === s._mpdData) throw new Error("DashWasmParser Error: No MPD to read.");
                                            const i = s._linearMemory,
                                                n = s._mpdData,
                                                a = n.mpd,
                                                r = n.cursor,
                                                o = Math.min(t, 15e3, a.byteLength - r);
                                            return new Uint8Array(i.buffer, e, o).set(new Uint8Array(a, r, o)), s._mpdData.cursor += o, o
                                        },
                                        onTagClose: function (e) {
                                            return i.popIfCurrent(e)
                                        }
                                    }
                                };
                            let r, o = null;
                            "string" == typeof e.wasmUrl ? r = fetch(e.wasmUrl) : (o = URL.createObjectURL(new Blob([e.wasmUrl], {
                                type: "application/wasm"
                            })), r = fetch(o));
                            const c = "function" == typeof WebAssembly.instantiateStreaming ? WebAssembly.instantiateStreaming(r, a) : Promise.reject("`WebAssembly.instantiateStreaming` API not available");
                            return t._initProm = c.catch(function () {
                                var e = ct()((function* (e) {
                                    null !== o && (URL.revokeObjectURL(o), o = null), l.Z.warn("Unable to call `instantiateStreaming` on WASM", e instanceof Error ? e : "");
                                    const t = yield r;
                                    if (t.status < 200 || t.status >= 300) throw new Error("WebAssembly request failed. status: " + String(t.status));
                                    const i = yield t.arrayBuffer();
                                    return WebAssembly.instantiate(i, a)
                                }));
                                return function (t) {
                                    return e.apply(this, arguments)
                                }
                            }()).then((e => {
                                null !== o && (URL.revokeObjectURL(o), o = null), t._instance = e, t._linearMemory = t._instance.instance.exports.memory, t.status = "initialized"
                            })).catch((e => {
                                const i = e instanceof Error ? e.toString() : "Unknown error";
                                throw l.Z.warn("DW: Could not create DASH-WASM parser:", i), t.status = "failure", e
                            })), t._initProm
                        }))()
                    }
                    runWasmParser(e, t) {
                        const i = this._parseMpd(e),
                            n = i[0],
                            s = i[1];
                        if (null === n) throw new Error("DASH Parser: Unknown error while parsing the MPD");
                        const a = _e(n, t, s);
                        return this._processParserReturnValue(a)
                    }
                    isCompatible() {
                        return Ut.Z && "function" == typeof ut.Z.TextDecoder
                    }
                    _parseMpd(e) {
                        var t;
                        if (null === this._instance) throw new Error("DashWasmParser not initialized");
                        if (this._isParsing) throw new Error("Parsing operation already pending.");
                        this._isParsing = !0, this._mpdData = {
                            mpd: e,
                            cursor: 0
                        };
                        const i = {},
                            n = Qt(i, this._linearMemory, this._parsersStack, e);
                        this._parsersStack.pushParsers(null, n, Ot.Z), this._warnings = [];
                        try {
                            this._instance.instance.exports.parse()
                        } catch (e) {
                            throw this._parsersStack.reset(), this._warnings = [], this._isParsing = !1, e
                        }
                        const s = null !== (t = i.mpd) && void 0 !== t ? t : null,
                            a = this._warnings;
                        return this._parsersStack.reset(), this._warnings = [], this._isParsing = !1, [s, a]
                    }
                    _parseXlink(e) {
                        if (null === this._instance) throw new Error("DashWasmParser not initialized");
                        if (this._isParsing) throw new Error("Parsing operation already pending.");
                        this._isParsing = !0, this._mpdData = {
                            mpd: e,
                            cursor: 0
                        };
                        const t = {
                                periods: []
                            },
                            i = function (e, t, i, n) {
                                return function (s) {
                                    switch (s) {
                                    case 2: {
                                        const a = {
                                            children: {
                                                adaptations: [],
                                                baseURLs: [],
                                                eventStreams: []
                                            },
                                            attributes: {}
                                        };
                                        e.periods.push(a);
                                        const r = qt(a.children, t, i, n),
                                            o = jt(a.attributes, t);
                                        i.pushParsers(s, r, o);
                                        break
                                    }
                                    default:
                                        i.pushParsers(s, Ot.Z, Ot.Z)
                                    }
                                }
                            }(t, this._linearMemory, this._parsersStack, e);
                        this._parsersStack.pushParsers(null, i, Ot.Z), this._warnings = [];
                        try {
                            this._instance.instance.exports.parse()
                        } catch (e) {
                            throw this._parsersStack.reset(), this._warnings = [], this._isParsing = !1, e
                        }
                        const n = t.periods,
                            s = this._warnings;
                        return this._parsersStack.reset(), this._warnings = [], this._isParsing = !1, [n, s]
                    }
                    _processParserReturnValue(e) {
                        if ("done" === e.type) return e;
                        if ("needs-clock" === e.type) {
                            const t = t => {
                                if (1 !== t.length) throw new Error("DASH parser: wrong number of loaded ressources.");
                                const i = e.value.continue(t[0].responseData);
                                return this._processParserReturnValue(i)
                            };
                            return {
                                type: "needs-resources",
                                value: {
                                    urls: [e.value.url],
                                    format: "string",
                                    continue: t
                                }
                            }
                        }
                        if ("needs-xlinks" === e.type) {
                            const t = t => {
                                const i = [];
                                for (let e = 0; e < t.length; e++) {
                                    const n = t[e],
                                        s = n.responseData,
                                        a = n.receivedTime,
                                        r = n.sendingTime,
                                        o = n.url;
                                    if (!s.success) throw s.error;
                                    const l = this._parseXlink(s.data),
                                        c = l[0],
                                        u = l[1];
                                    i.push({
                                        url: o,
                                        receivedTime: a,
                                        sendingTime: r,
                                        parsed: c,
                                        warnings: u
                                    })
                                }
                                const n = e.value.continue(i);
                                return this._processParserReturnValue(n)
                            };
                            return {
                                type: "needs-resources",
                                value: {
                                    urls: e.value.xlinksUrls,
                                    format: "arraybuffer",
                                    continue: t
                                }
                            }
                        }(0, a.UT)(e)
                    }
                },
                ei = {
                    _addFeature(e) {
                        void 0 === e.transports.dash && (e.transports.dash = Nt), e.dashParsers.wasm = Jt, e.mainThreadMediaSourceInit = n.Z, e.codecSupportProber = s.Z
                    },
                    initialize: e => Jt.initialize(e)
                };
            var ti = i(58964);
            const ii = 1e3;

            function ni(e, {
                textContent: t,
                className: i
            } = {}) {
                const n = document.createElement(e);
                return void 0 !== i && (n.className = i), void 0 !== t && (n.textContent = t), n
            }

            function si(e, t, {
                className: i
            } = {}) {
                const n = document.createElement(e);
                void 0 !== i && (n.className = i);
                for (const e of t) "string" == typeof e ? n.appendChild(document.createTextNode(e)) : n.appendChild(e);
                return n
            }

            function ai(e) {
                return e.clientHeight > 400
            }

            function ri(e) {
                const t = ni("span", {
                    textContent: e + "/"
                });
                return t.style.fontWeight = "bold", t
            }

            function oi() {
                const e = ni("canvas");
                return e.style.border = "1px solid white", e.style.height = "15px", e.style.marginLeft = "2px", e
            }

            function li(e, t, i) {
                const n = ni("div"),
                    s = ni("div"),
                    a = ni("div");
                o();
                const r = setInterval((() => {
                    o()
                }), ii);
                return i.register((() => {
                    clearInterval(r)
                })), si("div", [n, s, a]);

                function o() {
                    var i, o, l, c, u, d;
                    const h = e.getVideoElement();
                    if (null === h) return n.innerHTML = "", s.innerHTML = "", a.innerHTML = "", void clearInterval(r); {
                        const s = e.getPosition(),
                            a = e.getCurrentBufferGap(),
                            r = a === 1 / 0 ? "0" : a.toFixed(2),
                            l = [
                                ["ct", s.toFixed(2)],
                                ["bg", r],
                                ["rs", String(h.readyState)],
                                ["pr", String(h.playbackRate)],
                                ["sp", String(e.getPlaybackRate())],
                                ["pa", String(h.paused ? 1 : 0)],
                                ["en", String(h.ended ? 1 : 0)],
                                ["li", String(e.isLive() ? 1 : 0)],
                                ["wba", String(e.getWantedBufferAhead())],
                                ["st", `"${e.getPlayerState()}"`]
                            ];
                        !0 === (null === (i = e.getCurrentModeInformation()) || void 0 === i ? void 0 : i.useWorker) ? ti.Z ? l.push(["wo", "2"]) : l.push(["wo", "1"]) : l.push(["wo", "0"]);
                        const c = [],
                            u = e.getKeySystemConfiguration();
                        null !== u && c.push(["ks", u.keySystem]);
                        const d = e.getMaxBufferBehind();
                        d !== 1 / 0 && c.push(["mbb", String(d)]);
                        const m = e.getMaxBufferAhead();
                        m !== 1 / 0 && c.push(["mba", String(m)]);
                        const f = e.getMaxVideoBufferSize();
                        f !== 1 / 0 && c.push(["mbs", String(f)]);
                        const p = e.getMinimumPosition();
                        null !== p && (l.push(["mip", p.toFixed(2)]), c.push(["dmi", (s - p).toFixed(2)]));
                        const g = e.getMaximumPosition();
                        null !== g && (l.push(["map", g.toFixed(2)]), c.push(["dma", (g - s).toFixed(2)]));
                        const v = [],
                            y = e.getError();
                        null !== y && v.push(["er", `"${String(y)}"`]), n.innerHTML = "";
                        for (const e of [l, c, v])
                            if (e.length > 0) {
                                const t = ni("div");
                                for (const i of e) t.appendChild(ri(i[0])), t.appendChild(ni("span", {
                                    textContent: i[1] + " "
                                }));
                                n.appendChild(t)
                            } if (ai(t)) {
                            const t = null === (o = e.getContentUrls()) || void 0 === o ? void 0 : o[0];
                            if (void 0 !== t) {
                                const e = t.length > 100 ? t.substring(0, 99) + "…" : t;
                                n.appendChild(si("div", [ri("url"), ni("span", {
                                    textContent: e
                                })]))
                            }
                        }
                    }
                    if (ai(t)) {
                        const t = e.getAvailableVideoTracks().map((({
                                id: e,
                                active: t
                            }) => t ? `*${e}` : e)),
                            i = e.getAvailableAudioTracks().map((({
                                id: e,
                                active: t
                            }) => t ? `*${e}` : e)),
                            n = e.getAvailableTextTracks().map((({
                                id: e,
                                active: t
                            }) => t ? `*${e}` : e));
                        if (s.innerHTML = "", t.length > 0) {
                            let e = `${t.length}:${t.join(" ")} `;
                            e.length > 100 && (e = e.substring(0, 98) + "… ");
                            const i = si("div", [ri("vt"), ni("span", {
                                textContent: e
                            })]);
                            s.appendChild(i)
                        }
                        if (i.length > 0) {
                            let e = `${i.length}:${i.join(" ")} `;
                            e.length > 100 && (e = e.substring(0, 98) + "… ");
                            const t = si("div", [ri("at"), ni("span", {
                                textContent: e
                            })]);
                            s.appendChild(t)
                        }
                        if (n.length > 0) {
                            let e = `${n.length}:${n.join(" ")} `;
                            e.length > 100 && (e = e.substring(0, 98) + "… ");
                            const t = si("div", [ri("tt"), ni("span", {
                                textContent: e
                            })]);
                            s.appendChild(t)
                        }
                        const r = e.__priv_getCurrentAdaptation(),
                            o = null !== (c = null === (l = null == r ? void 0 : r.video) || void 0 === l ? void 0 : l.representations.map((e => {
                                var t;
                                return String(null !== (t = e.bitrate) && void 0 !== t ? t : "N/A") + (!1 !== e.isSupported ? "" : " U!") + (!1 !== e.decipherable ? "" : " E!")
                            }))) && void 0 !== c ? c : [],
                            h = null !== (d = null === (u = null == r ? void 0 : r.audio) || void 0 === u ? void 0 : u.representations.map((e => {
                                var t;
                                return String(null !== (t = e.bitrate) && void 0 !== t ? t : "N/A") + (!1 !== e.isSupported ? "" : " U!") + (!1 !== e.decipherable ? "" : " E!")
                            }))) && void 0 !== d ? d : [];
                        a.innerHTML = "", o.length > 0 && (a.appendChild(ri("vb")), a.appendChild(ni("span", {
                            textContent: o.join(" ") + " "
                        }))), h.length > 0 && (a.appendChild(ri("ab")), a.appendChild(ni("span", {
                            textContent: h.join(" ") + " "
                        })))
                    } else s.innerHTML = "", a.innerHTML = ""
                }
            }
            const ci = 1800,
                ui = ["#2ab7ca", "#fed766", "#4dd248", "#a22c28", "#556b2f", "#add8e6", "#90ee90", "#444444", "#40bfc1", "#57557e", "#fbe555"];
            class di {
                constructor(e) {
                    this._colorMap = new WeakMap, this._currNbColors = 0, this._canvasElt = e, this._canvasCtxt = this._canvasElt.getContext("2d"), this.clear()
                }
                clear() {
                    null !== this._canvasCtxt && this._canvasCtxt.clearRect(0, 0, this._canvasElt.width, this._canvasElt.height)
                }
                update(e) {
                    var t, i, n, s;
                    if (null === this._canvasCtxt) return;
                    const a = e.inventory,
                        r = e.currentTime,
                        o = e.width,
                        l = e.height;
                    let c, u, d, h;
                    if (this._canvasElt.style.width = `${o}px`, this._canvasElt.style.height = `${l}px`, this._canvasElt.width = o, this._canvasElt.height = l, this.clear(), c = void 0 !== e.minimumPosition ? a.length > 0 ? Math.min(e.minimumPosition, a[0].start) : e.minimumPosition : null !== (i = null === (t = a[0]) || void 0 === t ? void 0 : t.start) && void 0 !== i ? i : 0, u = void 0 !== e.maximumPosition ? a.length > 0 ? Math.max(e.maximumPosition, a[a.length - 1].end) : e.maximumPosition : null !== (s = null === (n = a[a.length - 1]) || void 0 === n ? void 0 : n.end) && void 0 !== s ? s : 1e3, c = Math.min(r, c), u = Math.max(r, u), u - c > ci ? u - r < 900 ? (h = u, d = u - ci) : r - c < 900 ? (d = c, h = c + ci) : (d = r - 900, h = r + 900) : (d = c, h = u), d >= h) return void this.clear();
                    const m = function (e, t, i) {
                        const n = [],
                            s = i - t;
                        for (let a = 0; a < e.length; a++) {
                            const r = e[a],
                                o = void 0 === r.bufferedStart ? r.start : r.bufferedStart,
                                l = void 0 === r.bufferedEnd ? r.end : r.bufferedEnd;
                            if (l > t && o < i) {
                                const e = Math.max(o - t, 0) / s,
                                    a = Math.min(l - t, i) / s;
                                n.push({
                                    scaledStart: e,
                                    scaledEnd: a,
                                    info: r
                                })
                            }
                        }
                        return n
                    }(a, d, h);
                    for (let e = 0; e < m.length; e++) this._paintRange(m[e], o, l);
                    void 0 !== r && function (e, t, i, n, s, a) {
                        if ("number" == typeof e && e >= t && e < i) {
                            const r = i - t;
                            n.fillStyle = "#FF0000", n.fillRect(Math.ceil((e - t) / r * s) - 1, 5, 5, a)
                        }
                    }(r, d, h, this._canvasCtxt, o, l)
                }
                _paintRange(e, t, i) {
                    if (null === this._canvasCtxt) return;
                    const n = e.scaledStart * t,
                        s = e.scaledEnd * t;
                    this._canvasCtxt.fillStyle = this._getColorForRepresentation(e.info.infos.representation), this._canvasCtxt.fillRect(Math.ceil(n), 0, Math.ceil(s - n), i)
                }
                _getColorForRepresentation(e) {
                    const t = this._colorMap.get(e);
                    if (void 0 !== t) return t;
                    const i = ui[this._currNbColors % ui.length];
                    return this._currNbColors++, this._colorMap.set(e, i), i
                }
            }

            function hi(e, t, i, n, s) {
                const a = ni("div"),
                    o = ri(i),
                    l = oi(),
                    c = ni("div"),
                    u = ni("div"),
                    d = new di(l),
                    h = setInterval(m, ii);
                return s.register((() => {
                    clearInterval(h)
                })), a.appendChild(o), a.appendChild(l), a.appendChild(c), a.appendChild(u), a.style.padding = "5px 0px", m(), a;

                function m() {
                    var i, s, o, l;
                    if (null === e.getVideoElement()) return a.style.display = "none", a.innerHTML = "", void clearInterval(h);
                    const m = ai(n),
                        f = e.__priv_getSegmentSinkContent(t);
                    if (null === f) a.style.display = "none", c.innerHTML = "", u.innerHTML = "";
                    else {
                        a.style.display = "block";
                        const h = e.getPosition(),
                            p = Math.min(n.clientWidth - 150, 600);
                        if (d.update({
                                currentTime: h,
                                minimumPosition: null !== (i = e.getMinimumPosition()) && void 0 !== i ? i : void 0,
                                maximumPosition: null !== (s = e.getMaximumPosition()) && void 0 !== s ? s : void 0,
                                inventory: f,
                                width: p,
                                height: 10
                            }), !m) return c.innerHTML = "", void(u.innerHTML = "");
                        c.innerHTML = "";
                        for (let e = 0; e < f.length; e++) {
                            const t = f[e],
                                i = t.bufferedStart,
                                n = t.bufferedEnd,
                                s = t.infos;
                            if (void 0 !== i && void 0 !== n && h >= i && h < n) {
                                c.appendChild(ri("play")), c.appendChild(ni("span", {
                                    textContent: mi(s)
                                }));
                                break
                            }
                        }
                        u.innerHTML = "";
                        const g = null === (o = e.__priv_getCurrentRepresentations()) || void 0 === o ? void 0 : o[t],
                            v = null === (l = e.__priv_getCurrentAdaptation()) || void 0 === l ? void 0 : l[t],
                            y = e.__priv_getManifest();
                        if (null !== y && !(0, r.Z)(g) && !(0, r.Z)(v)) {
                            const e = (0, _.Vm)(y, h);
                            void 0 !== e && (u.appendChild(ri("load")), u.appendChild(ni("span", {
                                textContent: mi({
                                    period: e,
                                    adaptation: v,
                                    representation: g
                                })
                            })))
                        }
                    }
                }
            }

            function mi(e) {
                var t;
                const i = e.period,
                    n = e.adaptation,
                    s = n.language,
                    a = n.isAudioDescription,
                    r = n.isClosedCaption,
                    o = n.isTrickModeTrack,
                    l = n.isSignInterpreted,
                    c = n.type,
                    u = e.representation,
                    d = u.id,
                    h = u.height,
                    m = u.width,
                    f = u.bitrate,
                    p = u.codecs;
                let g = `"${d}" `;
                return void 0 !== h && void 0 !== m && (g += `${m}x${h} `), void 0 !== f && (g += `(${(f/1e3).toFixed(0)}kbps) `), void 0 !== p && p.length > 0 && (g += `c:"${p.join(" / ")}" `), void 0 !== s && (g += `l:"${s}" `), "video" === c && "boolean" == typeof l && (g += `si:${l?1:0} `), "video" === c && "boolean" == typeof o && (g += `tm:${o?1:0} `), "audio" === c && "boolean" == typeof a && (g += `ad:${a?1:0} `), "text" === c && "boolean" == typeof r && (g += `cc:${r?1:0} `), g += `p:${i.start}-${null!==(t=i.end)&&void 0!==t?t:"?"}`, g
            }
            class fi {
                constructor(e) {
                    this._canvasElt = e, this._canvasCtxt = this._canvasElt.getContext("2d"), this._history = []
                }
                pushBufferSize(e) {
                    const t = (0, u.Z)();
                    if (this._history.push({
                            timestamp: t,
                            bufferSize: e
                        }), this._history.length > 0) {
                        const e = t - 3e4;
                        let i;
                        for (i = this._history.length - 1; i >= 1 && !(this._history[i].timestamp <= e); i--);
                        this._history = this._history.slice(i)
                    } else this._history = []
                }
                clear() {
                    null !== this._canvasCtxt && this._canvasCtxt.clearRect(0, 0, this._canvasElt.width, this._canvasElt.height)
                }
                reRender(e, t) {
                    this._canvasElt.style.width = `${e}px`, this._canvasElt.style.height = `${t}px`, this._canvasElt.width = e, this._canvasElt.height = t, this.clear();
                    const i = this._history,
                        n = this._canvasCtxt;
                    if (0 === i.length) return;
                    const s = function () {
                            const e = Math.max(...i.map((e => e.bufferSize)));
                            return Math.max(e + 5, 20)
                        }(),
                        a = i[0].timestamp,
                        r = t / s,
                        o = e / 3e4;

                    function l(e) {
                        return (e - a) * o
                    }! function () {
                        if (null === n) return;
                        n.beginPath(), n.fillStyle = "rgb(200, 100, 200)";
                        for (let a = 1; a < i.length; a++) {
                            const o = l(i[a].timestamp) - l(i[a - 1].timestamp),
                                c = t - (e = i[a].bufferSize, t - (s - e) * r);
                            n.fillRect(l(i[a - 1].timestamp), c, o, t)
                        }
                        var e;
                        n.stroke()
                    }()
                }
            }

            function pi(e, t, i) {
                const n = ni("div"),
                    s = ri("bgap"),
                    a = oi(),
                    r = new fi(a),
                    o = setInterval(l, ii);
                return i.register((() => {
                    clearInterval(o)
                })), n.appendChild(s), n.appendChild(a), n.style.padding = "7px 0px", l(), n;

                function l() {
                    if (null === e.getVideoElement()) return n.innerHTML = "", void clearInterval(o);
                    const i = e.getCurrentBufferGap();
                    i === 1 / 0 ? r.pushBufferSize(0) : r.pushBufferSize(i);
                    const s = Math.min(t.clientWidth - 150, 600);
                    r.reRender(s, 10)
                }
            }
            const gi = function (e, t, i) {
                const n = ni("div", {
                    textContent: "RxPlayer Debug Information"
                });
                n.style.fontWeight = "bold", n.style.borderBottom = "1px solid white", n.style.marginBottom = "5px", n.style.fontStyle = "italic";
                const s = si("div", [n, li(t, e, i), hi(t, "video", "vbuf", e, i), hi(t, "audio", "abuf", e, i), hi(t, "text", "tbuf", e, i), pi(t, e, i)]);
                s.style.backgroundColor = "#00000099", s.style.padding = "7px", s.style.fontSize = "13px", s.style.fontFamily = "mono, monospace", s.style.color = "white", s.style.display = "inline-block", s.style.bottom = "0px", e.appendChild(s), i.register((() => {
                    e.removeChild(s)
                }))
            };

            function vi(e) {
                e.createDebugElement = gi
            }
            var yi = i(99135),
                bi = i(82401),
                Ti = i(13873),
                ki = i(59667),
                _i = i(95589),
                Si = i(43426),
                wi = i(64137),
                Ei = i(72879);
            class Di extends Ti.K {
                constructor(e) {
                    super(), this._settings = e, this._initCanceller = new yt.ZP
                }
                prepare() {}
                start(e, t) {
                    const i = this._initCanceller.signal,
                        n = this._settings,
                        s = n.keySystems,
                        r = n.speed,
                        o = n.url;
                    (0, yi.Z)(e);
                    const c = new bi.Z(null);
                    c.finish();
                    const u = (0, Si.Z)(e, s, c, {
                        onError: e => this._onFatalError(e),
                        onWarning: e => this.trigger("warning", e),
                        onBlackListProtectionData: Ot.Z,
                        onKeyIdsCompatibilityUpdate: Ot.Z
                    }, i);
                    (0, Ei.Z)(e, (e => this._onFatalError(e)), i);
                    const d = new wi.Z(t, null, r);
                    d.addEventListener("stalled", (e => this.trigger("stalled", e))), d.addEventListener("unstalled", (() => this.trigger("unstalled", null))), d.addEventListener("warning", (e => this.trigger("warning", e))), i.register((() => {
                        d.destroy()
                    })), d.start(), u.onUpdate(((n, s) => {
                        "uninitialized" !== n.initializationState.type && (s(), l.Z.info("Setting URL to HTMLMediaElement", o), e.src = o, i.register((() => {
                            l.Z.info("Init: Removing directfile src from media element", e.src), (0, yi.Z)(e)
                        })), "awaiting-media-link" === n.initializationState.type ? (n.initializationState.value.isMediaLinked.setValue(!0), u.onUpdate(((i, n) => {
                            "initialized" === i.initializationState.type && (n(), this._seekAndPlay(e, t))
                        }), {
                            emitCurrentValue: !0,
                            clearSignal: i
                        })) : ((0, a.ZP)("initialized" === n.initializationState.type), this._seekAndPlay(e, t)))
                    }), {
                        emitCurrentValue: !0,
                        clearSignal: i
                    })
                }
                updateContentUrls(e, t) {
                    throw new Error("Cannot update content URL of directfile contents")
                }
                dispose() {
                    this._initCanceller.cancel()
                }
                _onFatalError(e) {
                    this._initCanceller.cancel(), this.trigger("error", e)
                }
                _seekAndPlay(e, t) {
                    const i = this._initCanceller.signal,
                        n = this._settings,
                        s = n.autoPlay,
                        a = n.startAt;
                    (0, _i.Z)({
                        mediaElement: e,
                        playbackObserver: t,
                        startTime: () => {
                            l.Z.debug("Init: Calculating initial time");
                            const t = function (e, t) {
                                if ((0, r.Z)(t)) return 0;
                                if (!(0, r.Z)(t.position)) return t.position;
                                if (!(0, r.Z)(t.wallClockTime)) return t.wallClockTime;
                                if (!(0, r.Z)(t.fromFirstPosition)) return t.fromFirstPosition;
                                const i = e.duration;
                                if ("number" == typeof t.fromLastPosition) return (0, r.Z)(i) || !isFinite(i) ? (l.Z.warn("startAt.fromLastPosition set but no known duration, beginning at 0."), 0) : Math.max(0, i + t.fromLastPosition);
                                if ("number" == typeof t.fromLivePosition) {
                                    const n = e.seekable.length > 0 ? e.seekable.end(0) : i;
                                    return (0, r.Z)(n) ? (l.Z.warn("startAt.fromLivePosition set but no known live position, beginning at 0."), 0) : Math.max(0, n + t.fromLivePosition)
                                }
                                if (!(0, r.Z)(t.percentage)) {
                                    if ((0, r.Z)(i) || !isFinite(i)) return l.Z.warn("startAt.percentage set but no known duration, beginning at 0."), 0;
                                    const e = t.percentage;
                                    if (e >= 100) return i;
                                    if (e <= 0) return 0;
                                    return i * (+e / 100)
                                }
                                return 0
                            }(e, a);
                            return l.Z.debug("Init: Initial time calculated:", t), t
                        },
                        mustAutoPlay: s,
                        onWarning: e => this.trigger("warning", e),
                        isDirectfile: !0
                    }, i).autoPlayResult.then((() => (0, ki.Z)(t, e, !0, i).onUpdate(((e, t) => {
                        e && (t(), this.trigger("loaded", {
                            segmentSinksStore: null
                        }))
                    }), {
                        emitCurrentValue: !0,
                        clearSignal: i
                    }))).catch((e => {
                        i.isCancelled() || this._onFatalError(e)
                    }))
                }
            }
            var xi = i(3835);
            var Pi = i(87501),
                Zi = i(25144);

            function Ii(e, t) {
                var i;
                if (t.length !== e.length) return !0;
                for (let n = 0; n < t.length; n++)
                    if (t[n].nativeTrack !== (null === (i = e[n]) || void 0 === i ? void 0 : i.nativeTrack)) return !0;
                return !1
            }

            function Ci(e) {
                var t;
                const i = [],
                    n = {};
                for (let s = 0; s < e.length; s++) {
                    const a = e[s],
                        r = "" === a.language ? "nolang" : a.language,
                        o = null !== (t = n[r]) && void 0 !== t ? t : 1,
                        l = "gen_audio_" + r + "_" + o.toString();
                    n[r] = o + 1;
                    const c = {
                        language: a.language,
                        id: l,
                        normalized: (0, Zi.ZP)(a.language),
                        audioDescription: "descriptions" === a.kind || "description" === a.kind,
                        representations: []
                    };
                    i.push({
                        track: c,
                        nativeTrack: a
                    })
                }
                return i
            }

            function Ri(e) {
                var t;
                const i = [],
                    n = {};
                for (let s = 0; s < e.length; s++) {
                    const a = e[s],
                        r = "" === a.language ? "nolang" : a.language,
                        o = null !== (t = n[r]) && void 0 !== t ? t : 1,
                        l = "gen_text_" + r + "_" + o.toString();
                    n[r] = o + 1;
                    const c = "forced" === a.kind || void 0,
                        u = {
                            language: a.language,
                            forced: c,
                            label: a.label,
                            id: l,
                            normalized: (0, Zi.ZP)(a.language),
                            closedCaption: "captions" === a.kind
                        };
                    i.push({
                        track: u,
                        nativeTrack: a
                    })
                }
                return i
            }

            function Ai(e) {
                var t;
                const i = [],
                    n = {};
                for (let s = 0; s < e.length; s++) {
                    const a = e[s],
                        r = "" === a.language ? "nolang" : a.language,
                        o = null !== (t = n[r]) && void 0 !== t ? t : 1,
                        l = "gen_video_" + r + "_" + o.toString();
                    n[r] = o + 1, i.push({
                        track: {
                            id: l,
                            representations: []
                        },
                        nativeTrack: a
                    })
                }
                return i
            }
            class Mi extends Pi.Z {
                constructor(e) {
                    var t, i, n;
                    super(), this._nativeAudioTracks = e.audioTracks, this._nativeVideoTracks = e.videoTracks, this._nativeTextTracks = e.textTracks, this._audioTracks = void 0 !== this._nativeAudioTracks ? Ci(this._nativeAudioTracks) : [], this._videoTracks = void 0 !== this._nativeVideoTracks ? Ai(this._nativeVideoTracks) : [], this._textTracks = void 0 !== this._nativeTextTracks ? Ri(this._nativeTextTracks) : [], this._lastEmittedNativeAudioTrack = null === (t = this._getCurrentAudioTrack()) || void 0 === t ? void 0 : t.nativeTrack, this._lastEmittedNativeVideoTrack = null === (i = this._getCurrentVideoTrack()) || void 0 === i ? void 0 : i.nativeTrack, this._lastEmittedNativeTextTrack = null === (n = this._getCurrentTextTrack()) || void 0 === n ? void 0 : n.nativeTrack, this._handleNativeTracksCallbacks()
                }
                setAudioTrackById(e) {
                    for (let t = 0; t < this._audioTracks.length; t++) {
                        const i = this._audioTracks[t],
                            n = i.track,
                            s = i.nativeTrack;
                        if (n.id === e) return this._enableAudioTrackFromIndex(t), void(this._audioTrackLockedOn = s)
                    }
                    throw new Error("Audio track not found.")
                }
                disableTextTrack() {
                    Ni(this._textTracks), this._textTrackLockedOn = null
                }
                setTextTrackById(e) {
                    let t = !1;
                    for (let i = 0; i < this._textTracks.length; i++) {
                        const n = this._textTracks[i],
                            s = n.track,
                            a = n.nativeTrack;
                        s.id === e ? (a.mode = "showing", t = !0, this._textTrackLockedOn = a) : "showing" !== a.mode && "hidden" !== a.mode || (a.mode = "disabled")
                    }
                    if (!t) throw new Error("Text track not found.")
                }
                disableVideoTrack() {
                    Ui(this._videoTracks), this._videoTrackLockedOn = null
                }
                setVideoTrackById(e) {
                    for (let t = 0; t < this._videoTracks.length; t++) {
                        const i = this._videoTracks[t],
                            n = i.track,
                            s = i.nativeTrack;
                        if (n.id === e) return s.selected = !0, void(this._videoTrackLockedOn = s)
                    }
                    throw new Error("Video track not found.")
                }
                getChosenAudioTrack() {
                    const e = this._getCurrentAudioTrack();
                    return (0, r.Z)(e) ? e : e.track
                }
                getChosenTextTrack() {
                    const e = this._getCurrentTextTrack();
                    return (0, r.Z)(e) ? e : e.track
                }
                getChosenVideoTrack() {
                    const e = this._getCurrentVideoTrack();
                    return (0, r.Z)(e) ? e : e.track
                }
                getAvailableAudioTracks() {
                    return this._audioTracks.map((({
                        track: e,
                        nativeTrack: t
                    }) => ({
                        id: e.id,
                        language: e.language,
                        normalized: e.normalized,
                        audioDescription: e.audioDescription,
                        active: t.enabled,
                        representations: e.representations
                    })))
                }
                getAvailableTextTracks() {
                    return this._textTracks.map((({
                        track: e,
                        nativeTrack: t
                    }) => ({
                        id: e.id,
                        label: e.label,
                        forced: e.forced,
                        language: e.language,
                        normalized: e.normalized,
                        closedCaption: e.closedCaption,
                        active: "showing" === t.mode
                    })))
                }
                getAvailableVideoTracks() {
                    return this._videoTracks.map((({
                        track: e,
                        nativeTrack: t
                    }) => ({
                        id: e.id,
                        representations: e.representations,
                        active: t.selected
                    })))
                }
                dispose() {
                    void 0 !== this._nativeVideoTracks && (this._nativeVideoTracks.onchange = null, this._nativeVideoTracks.onaddtrack = null, this._nativeVideoTracks.onremovetrack = null), void 0 !== this._nativeAudioTracks && (this._nativeAudioTracks.onchange = null, this._nativeAudioTracks.onaddtrack = null, this._nativeAudioTracks.onremovetrack = null), void 0 !== this._nativeTextTracks && (this._nativeTextTracks.onchange = null, this._nativeTextTracks.onaddtrack = null, this._nativeTextTracks.onremovetrack = null), this.removeEventListener()
                }
                _getCurrentAudioTrack() {
                    if (void 0 !== this._nativeAudioTracks) {
                        for (let e = 0; e < this._audioTracks.length; e++) {
                            const t = this._audioTracks[e];
                            if (t.nativeTrack.enabled) return t
                        }
                        return null
                    }
                }
                _getCurrentVideoTrack() {
                    if (void 0 !== this._nativeVideoTracks) {
                        for (let e = 0; e < this._videoTracks.length; e++) {
                            const t = this._videoTracks[e];
                            if (t.nativeTrack.selected) return t
                        }
                        return null
                    }
                }
                _getCurrentTextTrack() {
                    if (void 0 !== this._nativeTextTracks) {
                        for (let e = 0; e < this._textTracks.length; e++) {
                            const t = this._textTracks[e];
                            if ("showing" === t.nativeTrack.mode) return t
                        }
                        return null
                    }
                }
                _setPreviouslyLockedAudioTrack() {
                    if (void 0 !== this._audioTrackLockedOn)
                        if (null === this._audioTrackLockedOn)
                            for (let e = 0; e < this._audioTracks.length; e++) {
                                this._audioTracks[e].nativeTrack.enabled = !1
                            } else
                                for (let e = 0; e < this._audioTracks.length; e++) {
                                    if (this._audioTracks[e].nativeTrack === this._audioTrackLockedOn) return void this._enableAudioTrackFromIndex(e)
                                }
                }
                _setPreviouslyLockedTextTrack() {
                    if (void 0 !== this._textTrackLockedOn)
                        if (null !== this._textTrackLockedOn)
                            for (let e = 0; e < this._textTracks.length; e++) {
                                const t = this._textTracks[e].nativeTrack;
                                if (t === this._textTrackLockedOn) return Li(this._textTracks, t), void("showing" !== t.mode && (t.mode = "showing"))
                            } else Ni(this._textTracks)
                }
                _setPreviouslyLockedVideoTrack() {
                    if (void 0 !== this._videoTrackLockedOn)
                        if (null !== this._videoTrackLockedOn)
                            for (let e = 0; e < this._videoTracks.length; e++) {
                                const t = this._videoTracks[e].nativeTrack;
                                if (t === this._videoTrackLockedOn) return void(t.selected = !0)
                            } else Ui(this._videoTracks)
                }
                _handleNativeTracksCallbacks() {
                    void 0 !== this._nativeAudioTracks && (this._nativeAudioTracks.onaddtrack = () => {
                        var e, t;
                        if (void 0 !== this._nativeAudioTracks) {
                            const i = Ci(this._nativeAudioTracks);
                            if (Ii(this._audioTracks, i)) {
                                this._audioTracks = i, this._setPreviouslyLockedAudioTrack(), this.trigger("availableAudioTracksChange", this.getAvailableAudioTracks());
                                const n = this._getCurrentAudioTrack();
                                (null == n ? void 0 : n.nativeTrack) !== this._lastEmittedNativeAudioTrack && (this.trigger("audioTrackChange", null !== (e = null == n ? void 0 : n.track) && void 0 !== e ? e : null), this._lastEmittedNativeAudioTrack = null !== (t = null == n ? void 0 : n.nativeTrack) && void 0 !== t ? t : null)
                            }
                        }
                    }, this._nativeAudioTracks.onremovetrack = () => {
                        var e, t;
                        if (void 0 !== this._nativeAudioTracks) {
                            const i = Ci(this._nativeAudioTracks);
                            if (Ii(this._audioTracks, i)) {
                                this._audioTracks = i, this.trigger("availableAudioTracksChange", this.getAvailableAudioTracks());
                                const n = this._getCurrentAudioTrack();
                                (null == n ? void 0 : n.nativeTrack) !== this._lastEmittedNativeAudioTrack && (this.trigger("audioTrackChange", null !== (e = null == n ? void 0 : n.track) && void 0 !== e ? e : null), this._lastEmittedNativeAudioTrack = null !== (t = null == n ? void 0 : n.nativeTrack) && void 0 !== t ? t : null)
                            }
                        }
                    }, this._nativeAudioTracks.onchange = () => {
                        if (void 0 !== this._audioTracks)
                            for (let e = 0; e < this._audioTracks.length; e++) {
                                const t = this._audioTracks[e],
                                    i = t.track,
                                    n = t.nativeTrack;
                                if (n.enabled) return void(n !== this._lastEmittedNativeAudioTrack && (this.trigger("audioTrackChange", i), this._lastEmittedNativeAudioTrack = n))
                            }
                        null !== this._lastEmittedNativeAudioTrack && (this.trigger("audioTrackChange", null), this._lastEmittedNativeAudioTrack = null)
                    }), void 0 !== this._nativeTextTracks && (this._nativeTextTracks.onaddtrack = () => {
                        var e, t;
                        if (void 0 !== this._nativeTextTracks) {
                            const i = Ri(this._nativeTextTracks);
                            if (Ii(this._textTracks, i)) {
                                this._textTracks = i, this._setPreviouslyLockedTextTrack(), this.trigger("availableTextTracksChange", this.getAvailableTextTracks());
                                const n = this._getCurrentTextTrack();
                                (null == n ? void 0 : n.nativeTrack) !== this._lastEmittedNativeTextTrack && (this.trigger("textTrackChange", null !== (e = null == n ? void 0 : n.track) && void 0 !== e ? e : null), this._lastEmittedNativeTextTrack = null !== (t = null == n ? void 0 : n.nativeTrack) && void 0 !== t ? t : null)
                            }
                        }
                    }, this._nativeTextTracks.onremovetrack = () => {
                        var e, t;
                        if (void 0 !== this._nativeTextTracks) {
                            const i = Ri(this._nativeTextTracks);
                            if (Ii(this._textTracks, i)) {
                                this._textTracks = i, this._setPreviouslyLockedTextTrack(), this.trigger("availableTextTracksChange", this.getAvailableTextTracks());
                                const n = this._getCurrentTextTrack();
                                (null == n ? void 0 : n.nativeTrack) !== this._lastEmittedNativeTextTrack && (this.trigger("textTrackChange", null !== (e = null == n ? void 0 : n.track) && void 0 !== e ? e : null), this._lastEmittedNativeTextTrack = null !== (t = null == n ? void 0 : n.nativeTrack) && void 0 !== t ? t : null)
                            }
                        }
                    }, this._nativeTextTracks.onchange = () => {
                        if (void 0 !== this._textTracks)
                            for (let e = 0; e < this._textTracks.length; e++) {
                                const t = this._textTracks[e],
                                    i = t.track,
                                    n = t.nativeTrack;
                                if ("showing" === n.mode) return void(n !== this._lastEmittedNativeTextTrack && (this.trigger("textTrackChange", i), this._lastEmittedNativeTextTrack = n))
                            }
                        null !== this._lastEmittedNativeTextTrack && (this.trigger("textTrackChange", null), this._lastEmittedNativeTextTrack = null)
                    }), void 0 !== this._nativeVideoTracks && (this._nativeVideoTracks.onaddtrack = () => {
                        var e, t;
                        if (void 0 !== this._nativeVideoTracks) {
                            const i = Ai(this._nativeVideoTracks);
                            if (Ii(this._videoTracks, i)) {
                                this._videoTracks = i, this._setPreviouslyLockedVideoTrack(), this.trigger("availableVideoTracksChange", this.getAvailableVideoTracks());
                                const n = this._getCurrentVideoTrack();
                                (null == n ? void 0 : n.nativeTrack) !== this._lastEmittedNativeVideoTrack && (this.trigger("videoTrackChange", null !== (e = null == n ? void 0 : n.track) && void 0 !== e ? e : null), this._lastEmittedNativeVideoTrack = null !== (t = null == n ? void 0 : n.nativeTrack) && void 0 !== t ? t : null)
                            }
                        }
                    }, this._nativeVideoTracks.onremovetrack = () => {
                        var e, t;
                        if (void 0 !== this._nativeVideoTracks) {
                            const i = Ai(this._nativeVideoTracks);
                            if (Ii(this._videoTracks, i)) {
                                this._videoTracks = i, this._setPreviouslyLockedVideoTrack(), this.trigger("availableVideoTracksChange", this.getAvailableVideoTracks());
                                const n = this._getCurrentVideoTrack();
                                (null == n ? void 0 : n.nativeTrack) !== this._lastEmittedNativeVideoTrack && (this.trigger("videoTrackChange", null !== (e = null == n ? void 0 : n.track) && void 0 !== e ? e : null), this._lastEmittedNativeVideoTrack = null !== (t = null == n ? void 0 : n.nativeTrack) && void 0 !== t ? t : null)
                            }
                        }
                    }, this._nativeVideoTracks.onchange = () => {
                        if (void 0 !== this._videoTracks)
                            for (let e = 0; e < this._videoTracks.length; e++) {
                                const t = this._videoTracks[e],
                                    i = t.track,
                                    n = t.nativeTrack;
                                if (n.selected) return void(n !== this._lastEmittedNativeVideoTrack && (this.trigger("videoTrackChange", i), this._lastEmittedNativeVideoTrack = n))
                            }
                        null !== this._lastEmittedNativeVideoTrack && (this.trigger("videoTrackChange", null), this._lastEmittedNativeVideoTrack = null)
                    })
                }
                _enableAudioTrackFromIndex(e) {
                    ! function (e, t) {
                        for (let i = 0; i < e.length; i++) xi.yS && i === t || (e[i].enabled = !1);
                        t < 0 || t >= e.length || (e[t].enabled = !0)
                    }(this._audioTracks.map((({
                        nativeTrack: e
                    }) => e)), e)
                }
            }

            function Ni(e) {
                for (let t = 0; t < e.length; t++) {
                    e[t].nativeTrack.mode = "disabled"
                }
            }

            function Li(e, t) {
                for (let i = 0; i < e.length; i++) {
                    const n = e[i].nativeTrack;
                    n === t || "showing" !== n.mode && "hidden" !== n.mode || (n.mode = "disabled")
                }
            }

            function Ui(e) {
                for (let t = 0; t < e.length; t++) {
                    e[t].nativeTrack.selected = !1
                }
            }

            function Oi(e) {
                e.directfile = {
                    initDirectFile: Di,
                    mediaElementTracksStore: Mi
                }
            }
            var zi = i(67229),
                Ki = i(66890);
            const Fi = (0, Tt.pX)((0, k.tG)("pssh"), 0);

            function Bi(e, t) {
                for (let i = 0; i < e.length; i++) {
                    const n = e[i];
                    if ((void 0 === t.systemId || void 0 === n.systemId || t.systemId === n.systemId) && (0, Ki.Z)(t.data, n.data)) return !0
                }
                return !1
            }

            function Vi(e) {
                const t = e.initData,
                    i = e.initDataType;
                if ((0, r.Z)(t)) return l.Z.warn("Compat: No init data found on media encrypted event."), null;
                const n = function (e) {
                    const t = [];
                    let i = 0;
                    for (; i < e.length;) {
                        if (e.length < i + 8 || (0, Tt.pX)(e, i + 4) !== Fi) return l.Z.warn("Compat: Unrecognized initialization data. Use as is."), [{
                            systemId: void 0,
                            data: e
                        }];
                        const n = (0, Tt.pX)(new Uint8Array(e), i);
                        if (i + n > e.length) return l.Z.warn("Compat: Unrecognized initialization data. Use as is."), [{
                            systemId: void 0,
                            data: e
                        }];
                        const s = e.subarray(i, i + n),
                            a = {
                                systemId: (0, Pt.Y)(s, 8),
                                data: s
                            };
                        Bi(t, a) ? l.Z.warn("Compat: Duplicated PSSH found in initialization data, removing it.") : t.push(a), i += n
                    }
                    return i !== e.length ? (l.Z.warn("Compat: Unrecognized initialization data. Use as is."), [{
                        systemId: void 0,
                        data: e
                    }]) : t
                }(new Uint8Array(t));
                return {
                    type: i,
                    values: n
                }
            }
            var Hi = i(25998),
                Wi = i(23389);

            function $i(e) {
                return Wi.Z.setState(e, null), zi.ZP.setMediaKeys(e, null).then((() => {
                    l.Z.info("DRM: MediaKeys disabled with success")
                })).catch((e => {
                    l.Z.error("DRM: Could not disable MediaKeys", e instanceof Error ? e : "Unknown Error")
                }))
            }

            function Gi() {
                return (Gi = ct()((function* (e, {
                    emeImplementation: t,
                    keySystemOptions: i,
                    loadedSessionsStore: n,
                    mediaKeySystemAccess: s,
                    mediaKeys: a
                }, r) {
                    const o = Wi.Z.getState(e),
                        c = null !== o && o.loadedSessionsStore !== n ? o.loadedSessionsStore.closeAllSessions() : Promise.resolve();
                    if (yield c, r.isCancelled()) throw r.cancellationError;
                    Wi.Z.setState(e, {
                        emeImplementation: t,
                        keySystemOptions: i,
                        mediaKeySystemAccess: s,
                        mediaKeys: a,
                        loadedSessionsStore: n
                    }), e.mediaKeys !== a && (l.Z.info("DRM: Attaching MediaKeys to the media element"), t.setMediaKeys(e, a).then((() => {
                        l.Z.info("DRM: MediaKeys attached with success")
                    })).catch((e => {
                        l.Z.error("DRM: Could not set MediaKeys", e instanceof Error ? e : "Unknown Error")
                    })))
                }))).apply(this, arguments)
            }

            function Xi(e) {
                if ("" === e.sessionId) return !1;
                const t = e.keyStatuses,
                    i = [];
                return t.forEach((e => {
                    i.push(e)
                })), i.length <= 0 ? (l.Z.debug("DRM: isSessionUsable: MediaKeySession given has an empty keyStatuses", e.sessionId), !1) : (0, w.Z)(i, "expired") ? (l.Z.debug("DRM: isSessionUsable: MediaKeySession given has an expired key", e.sessionId), !1) : (0, w.Z)(i, "internal-error") ? (l.Z.debug("DRM: isSessionUsable: MediaKeySession given has a key with an internal-error", e.sessionId), !1) : (l.Z.debug("DRM: isSessionUsable: MediaKeySession is usable", e.sessionId), !0)
            }

            function qi(e, t, i, n) {
                const s = e.loadedSessionsStore,
                    a = e.persistentSessionsStore;
                return "temporary" === i ? ji(s, t) : null === a ? (l.Z.warn("DRM: Cannot create persistent MediaKeySession, PersistentSessionsStore not created."), ji(s, t)) : function (e, t, i, n) {
                    return Qi.apply(this, arguments)
                }(s, a, t, n)
            }

            function ji(e, t) {
                l.Z.info("DRM: Creating a new temporary session");
                const i = e.createSession(t, "temporary");
                return Promise.resolve({
                    type: "created-session",
                    value: i
                })
            }

            function Qi() {
                return Qi = ct()((function* (e, t, i, n) {
                    if (null !== n.cancellationError) throw n.cancellationError;
                    l.Z.info("DRM: Creating persistent MediaKeySession");
                    const s = e.createSession(i, "persistent-license"),
                        a = t.getAndReuse(i);
                    if (null === a) return {
                        type: "created-session",
                        value: s
                    };
                    try {
                        const n = yield e.loadPersistentSession(s.mediaKeySession, a.sessionId);
                        if (!n) {
                            l.Z.warn("DRM: No data stored for the loaded session"), t.delete(a.sessionId), e.removeSessionWithoutClosingIt(s.mediaKeySession);
                            return {
                                type: "created-session",
                                value: e.createSession(i, "persistent-license")
                            }
                        }
                        return n && Xi(s.mediaKeySession) ? (t.add(i, i.keyIds, s.mediaKeySession), l.Z.info("DRM: Succeeded to load persistent session."), {
                            type: "loaded-persistent-session",
                            value: s
                        }) : (l.Z.warn("DRM: Previous persistent session not usable anymore."), r())
                    } catch (e) {
                        return l.Z.warn("DRM: Unable to load persistent session: " + (e instanceof Error ? e.toString() : "Unknown Error")), r()
                    }

                    function r() {
                        return o.apply(this, arguments)
                    }

                    function o() {
                        return (o = ct()((function* () {
                            if (null !== n.cancellationError) throw n.cancellationError;
                            l.Z.info("DRM: Removing previous persistent session.");
                            const a = t.get(i);
                            null !== a && t.delete(a.sessionId);
                            try {
                                yield e.closeSession(s.mediaKeySession)
                            } catch (t) {
                                if ("" !== s.mediaKeySession.sessionId) throw t;
                                e.removeSessionWithoutClosingIt(s.mediaKeySession)
                            }
                            if (null !== n.cancellationError) throw n.cancellationError;
                            return {
                                type: "created-session",
                                value: e.createSession(i, "persistent-license")
                            }
                        }))).apply(this, arguments)
                    }
                })), Qi.apply(this, arguments)
            }

            function Yi() {
                return (Yi = ct()((function* (e, t) {
                    if (t < 0 || t >= e.getLength()) return;
                    l.Z.info("DRM: LSS cache limit exceeded", t, e.getLength());
                    const i = [],
                        n = e.getAll().slice(),
                        s = n.length - t;
                    for (let t = 0; t < s; t++) {
                        const s = n[t];
                        i.push(e.closeSession(s.mediaKeySession))
                    }
                    yield Promise.all(i)
                }))).apply(this, arguments)
            }

            function Ji() {
                return Ji = ct()((function* (e, t, i, n, s) {
                    let a = null;
                    const r = t.loadedSessionsStore,
                        o = t.persistentSessionsStore,
                        c = r.reuse(e);
                    if (null !== c) {
                        if (a = c.mediaKeySession, Xi(a)) return l.Z.info("DRM: Reuse loaded session", a.sessionId), {
                            type: "loaded-open-session",
                            value: {
                                mediaKeySession: a,
                                sessionType: c.sessionType,
                                keySessionRecord: c.keySessionRecord
                            }
                        };
                        null !== o && "" !== c.mediaKeySession.sessionId && o.delete(c.mediaKeySession.sessionId)
                    }
                    if (null !== a && (yield r.closeSession(a), null !== s.cancellationError)) throw s.cancellationError;
                    if (yield function (e, t) {
                            return Yi.apply(this, arguments)
                        }(r, n), null !== s.cancellationError) throw s.cancellationError;
                    const u = yield qi(t, e, i, s);
                    return {
                        type: u.type,
                        value: {
                            mediaKeySession: u.value.mediaKeySession,
                            sessionType: u.value.sessionType,
                            keySessionRecord: u.value.keySessionRecord
                        }
                    }
                })), Ji.apply(this, arguments)
            }

            function en(e, t, i) {
                const n = t.getConfiguration();
                if (xi.fq || xi.lV || (0, r.Z)(n)) return null;
                const s = e.filter((e => e.type === i.type && (!!((0, r.Z)(e.persistentLicenseConfig) && "required" !== e.persistentState || "required" === n.persistentState) && ("required" !== e.distinctiveIdentifier || "required" === n.distinctiveIdentifier))))[0];
                return void 0 !== s ? {
                    keySystemOptions: s,
                    keySystemAccess: t
                } : null
            }

            function tn(e, t, i) {
                l.Z.info("DRM: Searching for compatible MediaKeySystemAccess");
                const n = Wi.Z.getState(e);
                if (null !== n && zi.ZP.implementation === n.emeImplementation.implementation) {
                    const e = en(t, n.mediaKeySystemAccess, n.keySystemOptions);
                    if (null !== e) return l.Z.info("DRM: Found cached compatible keySystem"), Promise.resolve({
                        type: "reuse-media-key-system-access",
                        value: {
                            mediaKeySystemAccess: e.keySystemAccess,
                            options: e.keySystemOptions
                        }
                    })
                }
                const s = t.reduce(((e, t) => {
                    const i = o.Z.getCurrent().EME_KEY_SYSTEMS[t.type];
                    let n;
                    if ((0, r.Z)(i)) {
                        const e = function (e) {
                            const t = o.Z.getCurrent().EME_KEY_SYSTEMS;
                            for (const i of Object.keys(t))
                                if ((0, w.Z)(t[i], e)) return i
                        }(t.type);
                        n = [{
                            keyName: e,
                            keyType: t.type,
                            keySystemOptions: t
                        }]
                    } else n = i.map((e => ({
                        keyName: t.type,
                        keyType: e,
                        keySystemOptions: t
                    })));
                    return e.concat(n)
                }), []);
                return a(0);

                function a(e) {
                    return c.apply(this, arguments)
                }

                function c() {
                    return (c = ct()((function* (e) {
                        if (e >= s.length) throw new Hi.Z("INCOMPATIBLE_KEYSYSTEMS", "No key system compatible with your wanted configuration has been found in the current browser.");
                        if ((0, r.Z)(zi.ZP.requestMediaKeySystemAccess)) throw new Error("requestMediaKeySystemAccess is not implemented in your browser.");
                        const t = s[e],
                            n = t.keyType,
                            c = t.keySystemOptions,
                            u = function (e) {
                                const t = e.keyName,
                                    i = e.keyType,
                                    n = e.keySystemOptions,
                                    s = ["temporary"];
                                let a = "optional",
                                    l = "optional";
                                (0, r.Z)(n.persistentLicenseConfig) || (a = "required", s.push("persistent-license")), (0, r.Z)(n.persistentState) || (a = n.persistentState), (0, r.Z)(n.distinctiveIdentifier) || (l = n.distinctiveIdentifier);
                                const c = o.Z.getCurrent(),
                                    u = c.EME_DEFAULT_AUDIO_CODECS,
                                    d = c.EME_DEFAULT_VIDEO_CODECS,
                                    h = c.EME_DEFAULT_WIDEVINE_ROBUSTNESSES,
                                    m = c.EME_DEFAULT_PLAYREADY_RECOMMENDATION_ROBUSTNESSES;
                                let f, p;
                                const g = n.audioCapabilitiesConfig,
                                    y = n.videoCapabilitiesConfig;
                                if ("full" === (null == g ? void 0 : g.type)) f = g.value;
                                else {
                                    let e;
                                    e = "robustness" === (null == g ? void 0 : g.type) ? g.value : "widevine" === t ? h : "com.microsoft.playready.recommendation" === i ? m : [], 0 === e.length && e.push(void 0);
                                    const n = "contentType" === (null == g ? void 0 : g.type) ? g.value : u;
                                    f = v(e, (e => n.map((t => void 0 !== e ? {
                                        contentType: t,
                                        robustness: e
                                    } : {
                                        contentType: t
                                    }))))
                                }
                                if ("full" === (null == y ? void 0 : y.type)) p = y.value;
                                else {
                                    let e;
                                    e = "robustness" === (null == y ? void 0 : y.type) ? y.value : "widevine" === t ? h : "com.microsoft.playready.recommendation" === i ? m : [], 0 === e.length && e.push(void 0);
                                    const n = "contentType" === (null == y ? void 0 : y.type) ? y.value : d;
                                    p = v(e, (e => n.map((t => void 0 !== e ? {
                                        contentType: t,
                                        robustness: e
                                    } : {
                                        contentType: t
                                    }))))
                                }
                                const b = {
                                    initDataTypes: ["cenc"],
                                    videoCapabilities: p,
                                    audioCapabilities: f,
                                    distinctiveIdentifier: l,
                                    persistentState: a,
                                    sessionTypes: s
                                };
                                return [b, Object.assign(Object.assign({}, b), {
                                    audioCapabilities: void 0,
                                    videoCapabilities: void 0
                                })]
                            }(t);
                        l.Z.debug(`DRM: Request keysystem access ${n},${e+1} of ${s.length}`);
                        try {
                            const t = yield zi.ZP.requestMediaKeySystemAccess(n, u);
                            return l.Z.info("DRM: Found compatible keysystem", n, e + 1), {
                                type: "create-media-key-system-access",
                                value: {
                                    options: c,
                                    mediaKeySystemAccess: t
                                }
                            }
                        } catch (t) {
                            if (l.Z.debug("DRM: Rejected access to keysystem", n, e + 1), null !== i.cancellationError) throw i.cancellationError;
                            return a(e + 1)
                        }
                    }))).apply(this, arguments)
                }
            }
            var nn = i(81039);

            function sn(e, t, i) {
                let n;
                l.Z.debug("Compat: Calling generateRequest on the MediaKeySession");
                try {
                    n = function (e) {
                        l.Z.info("Compat: Trying to move CENC PSSH from init data at the end of it.");
                        let t = !1,
                            i = new Uint8Array,
                            n = new Uint8Array,
                            s = 0;
                        for (; s < e.length;) {
                            if (e.length < s + 8 || (0, Tt.pX)(e, s + 4) !== Fi) throw l.Z.warn("Compat: unrecognized initialization data. Cannot patch it."), new Error("Compat: unrecognized initialization data. Cannot patch it.");
                            const a = (0, Tt.pX)(new Uint8Array(e), s);
                            if (s + a > e.length) throw l.Z.warn("Compat: unrecognized initialization data. Cannot patch it."), new Error("Compat: unrecognized initialization data. Cannot patch it.");
                            const r = e.subarray(s, s + a);
                            if (16 === e[s + 12] && 119 === e[s + 13] && 239 === e[s + 14] && 236 === e[s + 15] && 192 === e[s + 16] && 178 === e[s + 17] && 77 === e[s + 18] && 2 === e[s + 19] && 172 === e[s + 20] && 227 === e[s + 21] && 60 === e[s + 22] && 30 === e[s + 23] && 82 === e[s + 24] && 226 === e[s + 25] && 251 === e[s + 26] && 75 === e[s + 27]) {
                                const e = (0, nn.Xj)(r),
                                    n = null === e ? void 0 : r[e[1]];
                                l.Z.info("Compat: CENC PSSH found with version", n), void 0 === n ? l.Z.warn("Compat: could not read version of CENC PSSH") : t === (1 === n) ? i = (0, Tt.zo)(i, r) : 1 === n ? (l.Z.warn("Compat: cenc version 1 encountered, removing every other cenc pssh box."), i = r, t = !0) : l.Z.warn("Compat: filtering out cenc pssh box with wrong version", n)
                            } else n = (0, Tt.zo)(n, r);
                            s += a
                        }
                        if (s !== e.length) throw l.Z.warn("Compat: unrecognized initialization data. Cannot patch it."), new Error("Compat: unrecognized initialization data. Cannot patch it.");
                        return (0, Tt.zo)(n, i)
                    }(i)
                } catch (e) {
                    n = i
                }
                const s = null != t ? t : "";
                return e.generateRequest(s, n).catch((t => {
                    if ("" !== s || !(t instanceof TypeError)) throw t;
                    return l.Z.warn('Compat: error while calling `generateRequest` with an empty initialization data type. Retrying with a default "cenc" value.', t), e.generateRequest("cenc", n)
                }))
            }
            const an = 100;

            function rn(e, t) {
                return on.apply(this, arguments)
            }

            function on() {
                return (on = ct()((function* (e, t) {
                    l.Z.info("DRM: Load persisted session", t);
                    const i = yield e.load(t);
                    return !i || e.keyStatuses.size > 0 ? i : new Promise((t => {
                        e.addEventListener("keystatuseschange", s);
                        const n = setTimeout(s, an);

                        function s() {
                            clearTimeout(n), e.removeEventListener("keystatuseschange", s), t(i)
                        }
                    }))
                }))).apply(this, arguments)
            }
            var ln = i(90352);

            function cn(e) {
                const t = new yt.ZP;
                return Promise.race([e.close().then((() => {
                    t.cancel()
                })), e.closed.then((() => {
                    t.cancel()
                })), function () {
                    return i.apply(this, arguments)
                }()]);

                function i() {
                    return i = ct()((function* () {
                        try {
                            yield(0, ln.Z)(1e3, t.signal), yield function () {
                                return n.apply(this, arguments)
                            }()
                        } catch (e) {
                            if (e instanceof yt.FU) return;
                            const t = e instanceof Error ? e.message : "Unknown error made it impossible to close the session";
                            l.Z.error(`DRM: ${t}`)
                        }
                    })), i.apply(this, arguments)
                }

                function n() {
                    return (n = ct()((function* () {
                        try {
                            yield e.update(new Uint8Array(1))
                        } catch (e) {
                            if (t.isUsed()) return;
                            if (e instanceof Error && "The session is already closed." === e.message) return;
                            yield(0, ln.Z)(1e3, t.signal)
                        }
                        if (!t.isUsed()) throw new Error("Compat: Couldn't know if session is closed")
                    }))).apply(this, arguments)
                }
            }

            function un(e, t) {
                for (const i of e) {
                    if (!t.some((e => (0, Ki.Z)(e, i)))) return !1
                }
                return !0
            }
            class dn {
                constructor(e) {
                    this._initializationData = e, this._keyIds = null
                }
                associateKeyIds(e) {
                    null === this._keyIds && (this._keyIds = []);
                    const t = Array.from(e);
                    for (const e of t) this.isAssociatedWithKeyId(e) || this._keyIds.push(e)
                }
                isAssociatedWithKeyId(e) {
                    if (null === this._keyIds) return !1;
                    for (const t of this._keyIds)
                        if ((0, Ki.Z)(t, e)) return !0;
                    return !1
                }
                getAssociatedKeyIds() {
                    return null === this._keyIds ? [] : this._keyIds
                }
                isCompatibleWith(e) {
                    const t = e.keyIds;
                    if (void 0 !== t && t.length > 0) {
                        if (null !== this._keyIds && un(t, this._keyIds)) return !0;
                        if (void 0 !== this._initializationData.keyIds) return un(t, this._initializationData.keyIds)
                    }
                    return this._checkInitializationDataCompatibility(e)
                }
                _checkInitializationDataCompatibility(e) {
                    return void 0 !== e.keyIds && e.keyIds.length > 0 && void 0 !== this._initializationData.keyIds ? un(e.keyIds, this._initializationData.keyIds) : this._initializationData.type === e.type && this._initializationData.values.isCompatibleWith(e.values)
                }
            }
            class hn {
                constructor(e) {
                    this._mediaKeys = e, this._storage = []
                }
                createSession(e, t) {
                    const i = new dn(e);
                    l.Z.debug("DRM-LSS: calling `createSession`", t);
                    const n = this._mediaKeys.createSession(t),
                        s = {
                            mediaKeySession: n,
                            sessionType: t,
                            keySessionRecord: i,
                            isGeneratingRequest: !1,
                            isLoadingPersistentSession: !1,
                            closingStatus: {
                                type: "none"
                            }
                        };
                    return (0, r.Z)(n.closed) || n.closed.then((() => {
                        l.Z.info("DRM-LSS: session was closed, removing it.", n.sessionId);
                        const e = this.getIndex(i);
                        e >= 0 && this._storage[e].mediaKeySession === n && this._storage.splice(e, 1)
                    })).catch((e => {
                        l.Z.warn(`DRM-LSS: MediaKeySession.closed rejected: ${e}`)
                    })), this._storage.push(Object.assign({}, s)), l.Z.debug("DRM-LSS: MediaKeySession added", s.sessionType, this._storage.length), s
                }
                reuse(e) {
                    for (let t = this._storage.length - 1; t >= 0; t--) {
                        const i = this._storage[t];
                        if (i.keySessionRecord.isCompatibleWith(e)) return this._storage.splice(t, 1), this._storage.push(i), l.Z.debug("DRM-LSS: Reusing session:", i.mediaKeySession.sessionId, i.sessionType), Object.assign({}, i)
                    }
                    return null
                }
                getEntryForSession(e) {
                    for (let t = this._storage.length - 1; t >= 0; t--) {
                        const i = this._storage[t];
                        if (i.mediaKeySession === e) return Object.assign({}, i)
                    }
                    return null
                }
                generateLicenseRequest(e, t, i) {
                    var n = this;
                    return ct()((function* () {
                        let s;
                        for (const t of n._storage)
                            if (t.mediaKeySession === e) {
                                s = t;
                                break
                            } if (void 0 === s) return l.Z.error("DRM-LSS: generateRequest error. No MediaKeySession found with the given initData and initDataType"), sn(e, t, i);
                        if (s.isGeneratingRequest = !0, "none" !== s.closingStatus.type) throw new Error("The `MediaKeySession` is being closed.");
                        try {
                            yield sn(e, t, i)
                        } catch (e) {
                            if (void 0 === s) throw e;
                            throw s.isGeneratingRequest = !1, "awaiting" === s.closingStatus.type && s.closingStatus.start(), e
                        }
                        void 0 !== s && (s.isGeneratingRequest = !1, "awaiting" === s.closingStatus.type && s.closingStatus.start())
                    }))()
                }
                loadPersistentSession(e, t) {
                    var i = this;
                    return ct()((function* () {
                        let n, s;
                        for (const t of i._storage)
                            if (t.mediaKeySession === e) {
                                n = t;
                                break
                            } if (void 0 === n) return l.Z.error("DRM-LSS: loadPersistentSession error. No MediaKeySession found with the given initData and initDataType"), rn(e, t);
                        if (n.isLoadingPersistentSession = !0, "none" !== n.closingStatus.type) throw new Error("The `MediaKeySession` is being closed.");
                        try {
                            s = yield rn(e, t)
                        } catch (e) {
                            if (void 0 === n) throw e;
                            throw n.isLoadingPersistentSession = !1, "awaiting" === n.closingStatus.type && n.closingStatus.start(), e
                        }
                        return void 0 === n || (n.isLoadingPersistentSession = !1, "awaiting" === n.closingStatus.type && n.closingStatus.start()), s
                    }))()
                }
                closeSession(e) {
                    var t = this;
                    return ct()((function* () {
                        let i;
                        for (const n of t._storage)
                            if (n.mediaKeySession === e) {
                                i = n;
                                break
                            } return void 0 === i ? (l.Z.warn("DRM-LSS: No MediaKeySession found with the given initData and initDataType"), Promise.resolve(!1)) : t._closeEntry(i)
                    }))()
                }
                getLength() {
                    return this._storage.length
                }
                getAll() {
                    return this._storage
                }
                closeAllSessions() {
                    var e = this;
                    return ct()((function* () {
                        const t = e._storage;
                        l.Z.debug("DRM-LSS: Closing all current MediaKeySessions", t.length), e._storage = [];
                        const i = t.map((t => e._closeEntry(t)));
                        yield Promise.all(i)
                    }))()
                }
                removeSessionWithoutClosingIt(e) {
                    (0, a.ZP)("" === e.sessionId, "Initialized `MediaKeySession`s should always be properly closed");
                    for (let t = this._storage.length - 1; t >= 0; t--) {
                        if (this._storage[t].mediaKeySession === e) return l.Z.debug("DRM-LSS: Removing session without closing it", e.sessionId), this._storage.splice(t, 1), !0
                    }
                    return !1
                }
                getIndex(e) {
                    for (let t = 0; t < this._storage.length; t++) {
                        if (this._storage[t].keySessionRecord === e) return t
                    }
                    return -1
                }
                _closeEntry(e) {
                    return ct()((function* () {
                        const t = e.mediaKeySession;
                        return new Promise(((i, n) => {
                            function s() {
                                void 0 !== e && (e.closingStatus = {
                                        type: "pending"
                                    }),
                                    function (e) {
                                        return mn.apply(this, arguments)
                                    }(t).then((() => {
                                        void 0 !== e && (e.closingStatus = {
                                            type: "done"
                                        }), i(!0)
                                    })).catch((t => {
                                        void 0 !== e && (e.closingStatus = {
                                            type: "failed"
                                        }), n(t)
                                    }))
                            }
                            void 0 !== e && (e.isLoadingPersistentSession || e.isGeneratingRequest) ? e.closingStatus = {
                                type: "awaiting",
                                start: s
                            } : s()
                        }))
                    }))()
                }
            }

            function mn() {
                return (mn = ct()((function* (e) {
                    l.Z.debug("DRM: Trying to close a MediaKeySession", e.sessionId);
                    try {
                        return yield cn(e), void l.Z.debug("DRM: Succeeded to close MediaKeySession")
                    } catch (e) {
                        return void l.Z.error("DRM: Could not close MediaKeySession: " + (e instanceof Error ? e.toString() : "Unknown error"))
                    }
                }))).apply(this, arguments)
            }

            function fn(e) {
                let t, i = 0;
                for (let n = 0; n < e.length; n++) t = e[n], i = (i << 5) - i + t, i &= i;
                return i
            }
            class pn {
                constructor(e) {
                    this.initData = e
                }
                toJSON() {
                    return (0, Ee.J)(this.initData)
                }
                static decode(e) {
                    return (0, Ee.K)(e)
                }
            }

            function gn(e, t) {
                var i, n;
                return null !== (n = null !== (i = vn(e, t)) && void 0 !== i ? i : vn(t, e)) && void 0 !== n && n
            }

            function vn(e, t) {
                if (0 === e.length) return !1;
                if (t.length < e.length) return null;
                const i = e[0];
                let n = 0,
                    s = 0;
                for (; s < t.length; s++) {
                    const a = t[s];
                    if (a.systemId !== i.systemId) continue;
                    if (a.hash !== i.hash) return !1;
                    let r, o;
                    if (r = i.data instanceof Uint8Array ? i.data : "string" == typeof i.data ? pn.decode(i.data) : i.data.initData, o = a.data instanceof Uint8Array ? a.data : "string" == typeof a.data ? pn.decode(a.data) : a.data.initData, !(0, Ki.Z)(r, o)) return !1;
                    if (t.length - s < e.length) return null;
                    for (n = 1; n < e.length; n++) {
                        const i = e[n];
                        for (s += 1; s < t.length; s++) {
                            const e = t[s];
                            if (i.systemId !== e.systemId) continue;
                            if (i.hash !== e.hash) return !1;
                            let n, a;
                            if (n = i.data instanceof Uint8Array ? i.data : "string" == typeof i.data ? pn.decode(i.data) : i.data.initData, a = e.data instanceof Uint8Array ? e.data : "string" == typeof e.data ? pn.decode(e.data) : e.data.initData, !(0, Ki.Z)(n, a)) return !1;
                            break
                        }
                        if (n === t.length) return null
                    }
                    return !0
                }
                return null
            }
            class yn {
                constructor(e) {
                    ! function (e) {
                        (0, a.u2)(e, {
                            save: "function",
                            load: "function"
                        }, "persistentLicenseConfig")
                    }(e), this._entries = [], this._storage = e;
                    try {
                        let e = this._storage.load();
                        Array.isArray(e) || (e = []), this._entries = e
                    } catch (e) {
                        l.Z.warn("DRM-PSS: Could not get entries from license storage", e instanceof Error ? e : ""), this.dispose()
                    }
                }
                getLength() {
                    return this._entries.length
                }
                getAll() {
                    return this._entries
                }
                get(e) {
                    const t = this._getIndex(e);
                    return -1 === t ? null : this._entries[t]
                }
                getAndReuse(e) {
                    const t = this._getIndex(e);
                    if (-1 === t) return null;
                    const i = this._entries.splice(t, 1)[0];
                    return this._entries.push(i), i
                }
                add(e, t, i) {
                    var n;
                    if ((0, r.Z)(i) || !(0, E.Z)(i.sessionId)) return void l.Z.warn("DRM-PSS: Invalid Persisten Session given.");
                    const s = i.sessionId,
                        a = this._getIndex(e);
                    if (a >= 0) {
                        const e = void 0 === t ? 3 : 4,
                            i = this._entries[a];
                        if ((null !== (n = i.version) && void 0 !== n ? n : -1) >= e && s === i.sessionId) return;
                        l.Z.info("DRM-PSS: Updating session info.", s), this._entries.splice(a, 1)
                    } else l.Z.info("DRM-PSS: Add new session", s);
                    const o = e.values.getFormattedValues().map((({
                        systemId: e,
                        data: t,
                        hash: i
                    }) => ({
                        systemId: e,
                        hash: i,
                        data: new pn(t)
                    })));
                    void 0 === t ? this._entries.push({
                        version: 3,
                        sessionId: s,
                        values: o,
                        initDataType: e.type
                    }) : this._entries.push({
                        version: 4,
                        sessionId: s,
                        keyIds: t.map((e => new pn(e))),
                        values: o,
                        initDataType: e.type
                    }), this._save()
                }
                delete(e) {
                    let t = -1;
                    for (let i = 0; i < this._entries.length; i++) {
                        if (this._entries[i].sessionId === e) {
                            t = i;
                            break
                        }
                    }
                    if (-1 === t) return void l.Z.warn("DRM-PSS: initData to delete not found.");
                    const i = this._entries[t];
                    l.Z.warn("DRM-PSS: Delete session from store", i.sessionId), this._entries.splice(t, 1), this._save()
                }
                deleteOldSessions(e) {
                    l.Z.info(`DRM-PSS: Deleting last ${e} sessions.`), e <= 0 || (e <= this._entries.length ? this._entries.splice(0, e) : (l.Z.warn("DRM-PSS: Asked to remove more information that it contains", e, this._entries.length), this._entries = []), this._save())
                }
                dispose() {
                    this._entries = [], this._save()
                }
                _getIndex(e) {
                    let t = null;

                    function i() {
                        if (null === t) {
                            const i = e.values.constructRequestData();
                            t = {
                                initData: i,
                                initDataHash: fn(i)
                            }
                        }
                        return t
                    }
                    for (let t = 0; t < this._entries.length; t++) {
                        const n = this._entries[t];
                        if (n.initDataType === e.type) switch (n.version) {
                        case 4:
                            if (void 0 !== e.keyIds) {
                                if (e.keyIds.every((e => {
                                        const t = (0, Ee.J)(e);
                                        for (const i of n.keyIds)
                                            if ("string" == typeof i) {
                                                if (t === i) return !0
                                            } else if ((0, Ki.Z)(i.initData, e)) return !0;
                                        return !1
                                    }))) return t
                            } else {
                                if (gn(e.values.getFormattedValues(), n.values)) return t
                            }
                            break;
                        case 3:
                            if (gn(e.values.getFormattedValues(), n.values)) return t;
                            break;
                        case 2: {
                            const e = i(),
                                s = e.initData,
                                a = e.initDataHash;
                            if (n.initDataHash === a) try {
                                const e = "string" == typeof n.initData ? pn.decode(n.initData) : n.initData.initData;
                                if ((0, Ki.Z)(e, s)) return t
                            } catch (e) {
                                l.Z.warn("DRM-PSS: Could not decode initialization data.", e instanceof Error ? e : "")
                            }
                            break
                        }
                        case 1: {
                            const e = i(),
                                s = e.initData,
                                a = e.initDataHash;
                            if (n.initDataHash === a) {
                                if (void 0 === n.initData.length) return t;
                                if ((0, Ki.Z)(n.initData, s)) return t
                            }
                            break
                        }
                        default: {
                            const e = i().initDataHash;
                            if (n.initData === e) return t
                        }
                        }
                    }
                    return -1
                }
                _save() {
                    try {
                        this._storage.save(this._entries)
                    } catch (e) {
                        const t = e instanceof Error ? e : void 0;
                        l.Z.warn("DRM-PSS: Could not save MediaKeySession information", t)
                    }
                }
            }
            const bn = new WeakMap,
                Tn = {
                    prepare(e) {
                        bn.set(e, null)
                    },
                    set(e, t) {
                        const i = t instanceof Uint8Array ? t : new Uint8Array(t instanceof ArrayBuffer ? t : t.buffer),
                            n = fn(i);
                        bn.set(e, {
                            hash: n,
                            serverCertificate: i
                        })
                    },
                    hasOne(e) {
                        const t = bn.get(e);
                        return void 0 !== t && (null !== t || void 0)
                    },
                    has(e, t) {
                        const i = bn.get(e);
                        if (null == i) return !1;
                        const n = i.hash,
                            s = i.serverCertificate,
                            a = t instanceof Uint8Array ? t : new Uint8Array(t instanceof ArrayBuffer ? t : t.buffer);
                        if (fn(a) !== n || s.length !== a.length) return !1;
                        for (let e = 0; e < s.length; e++)
                            if (s[e] !== a[e]) return !1;
                        return !0
                    }
                };

            function kn() {
                return kn = ct()((function* (e, t, i) {
                    const n = yield tn(e, t, i);
                    if (null !== i.cancellationError) throw i.cancellationError;
                    const s = n.value,
                        a = s.options,
                        o = s.mediaKeySystemAccess,
                        c = Wi.Z.getState(e),
                        u = function (e) {
                            const t = e.persistentLicenseConfig;
                            return (0, r.Z)(t) ? null : (l.Z.debug("DRM: Set the given license storage"), new yn(t))
                        }(a);
                    if (!xi.$u && !xi.l_ && null !== c && "reuse-media-key-system-access" === n.type) {
                        const e = c.mediaKeys,
                            t = c.loadedSessionsStore;
                        if (!1 === Tn.hasOne(e) || !(0, r.Z)(a.serverCertificate) && Tn.has(e, a.serverCertificate)) return {
                            mediaKeys: e,
                            mediaKeySystemAccess: o,
                            stores: {
                                loadedSessionsStore: t,
                                persistentSessionsStore: u
                            },
                            options: a
                        }
                    }
                    const d = yield function (e) {
                        return _n.apply(this, arguments)
                    }(o);
                    l.Z.info("DRM: MediaKeys created with success");
                    return {
                        mediaKeys: d,
                        mediaKeySystemAccess: o,
                        stores: {
                            loadedSessionsStore: new hn(d),
                            persistentSessionsStore: u
                        },
                        options: a
                    }
                })), kn.apply(this, arguments)
            }

            function _n() {
                return (_n = ct()((function* (e) {
                    l.Z.info("DRM: Calling createMediaKeys on the MediaKeySystemAccess");
                    try {
                        return yield e.createMediaKeys()
                    } catch (e) {
                        const t = e instanceof Error ? e.message : "Unknown error when creating MediaKeys.";
                        throw new Hi.Z("CREATE_MEDIA_KEYS_ERROR", t)
                    }
                }))).apply(this, arguments)
            }

            function Sn() {
                return Sn = ct()((function* (e, t, i) {
                    const n = yield function (e, t, i) {
                        return kn.apply(this, arguments)
                    }(e, t, i), s = n.mediaKeys;
                    return null !== e.mediaKeys && void 0 !== e.mediaKeys && s !== e.mediaKeys && (l.Z.debug("DRM: Disabling old MediaKeys"), xi.$u ? yield $i(e): $i(e).catch(Ot.Z)), n
                })), Sn.apply(this, arguments)
            }
            var wn = i(57003),
                En = i(72748),
                Dn = i(43177);

            function xn(e, t, i) {
                const n = t.baseDelay,
                    s = t.maxDelay,
                    a = t.totalRetry,
                    o = t.shouldRetry,
                    l = t.onRetry;
                let c = 0;
                return u();

                function u() {
                    return d.apply(this, arguments)
                }

                function d() {
                    return d = ct()((function* () {
                        if (null !== i.cancellationError) throw i.cancellationError;
                        try {
                            return yield e()
                        } catch (e) {
                            if (null !== i.cancellationError) throw i.cancellationError;
                            if (!(0, r.Z)(o) && !o(e) || c++ >= a) throw e;
                            "function" == typeof l && l(e, c);
                            const t = function (e, t, i) {
                                const n = e * Math.pow(2, t - 1),
                                    s = (0, En.Z)(n);
                                return Math.min(s, i)
                            }(n, c, s);
                            yield(0, Dn.Z)(t);
                            return u()
                        }
                    })), d.apply(this, arguments)
                }
            }
            class Pn extends Error {
                constructor(e) {
                    super(), Object.setPrototypeOf(this, Pn.prototype), this.reason = e
                }
            }
            const Zn = {
                EXPIRED: "expired",
                INTERNAL_ERROR: "internal-error",
                OUTPUT_RESTRICTED: "output-restricted"
            };

            function In(e, t, i) {
                const n = t.onKeyInternalError,
                    s = t.onKeyOutputRestricted,
                    r = t.onKeyExpiration,
                    o = [],
                    c = [],
                    u = [];
                let d;
                return e.keyStatuses.forEach(((e, t) => {
                    const d = "string" == typeof e ? [e, t] : [t, e],
                        h = d[0],
                        m = function (e, t) {
                            return -1 !== e.indexOf("playready") && (xi.YM || xi.kD) ? (0, k.wO)(t) : t
                        }(i, new Uint8Array(d[1])),
                        f = {
                            keyId: m.buffer,
                            keyStatus: h
                        };
                    switch (l.Z.hasLevel("DEBUG") && l.Z.debug(`DRM: key status update (${(0,k.ci)(m)}): ${h}`), h) {
                    case Zn.EXPIRED: {
                        const e = new Hi.Z("KEY_STATUS_CHANGE_ERROR", `A decryption key expired (${(0,k.ci)(m)})`, {
                            keyStatuses: [f, ...u]
                        });
                        if ("error" === r || void 0 === r) throw e;
                        switch (r) {
                        case "close-session":
                            throw new Pn(e);
                        case "fallback":
                            o.push(m);
                            break;
                        default:
                            "continue" === r || void 0 === r ? c.push(m) : (0, a.UT)(r)
                        }
                        u.push(f);
                        break
                    }
                    case Zn.INTERNAL_ERROR: {
                        const e = new Hi.Z("KEY_STATUS_CHANGE_ERROR", `A "${h}" status has been encountered (${(0,k.ci)(m)})`, {
                            keyStatuses: [f, ...u]
                        });
                        switch (n) {
                        case void 0:
                        case "error":
                            throw e;
                        case "close-session":
                            throw new Pn(e);
                        case "fallback":
                            o.push(m);
                            break;
                        case "continue":
                            c.push(m);
                            break;
                        default:
                            if (void 0 === n) throw e;
                            (0, a.UT)(n)
                        }
                        u.push(f);
                        break
                    }
                    case Zn.OUTPUT_RESTRICTED: {
                        const e = new Hi.Z("KEY_STATUS_CHANGE_ERROR", `A "${h}" status has been encountered (${(0,k.ci)(m)})`, {
                            keyStatuses: [f, ...u]
                        });
                        switch (s) {
                        case void 0:
                        case "error":
                            throw e;
                        case "fallback":
                            o.push(m);
                            break;
                        case "continue":
                            c.push(m);
                            break;
                        default:
                            if (void 0 === s) throw e;
                            (0, a.UT)(s)
                        }
                        u.push(f);
                        break
                    }
                    default:
                        c.push(m)
                    }
                })), u.length > 0 && (d = new Hi.Z("KEY_STATUS_CHANGE_ERROR", "One or several problematic key statuses have been encountered", {
                    keyStatuses: u
                })), {
                    warning: d,
                    blacklistedKeyIds: o,
                    whitelistedKeyIds: c
                }
            }

            function Cn(e, t, i, n, s) {
                l.Z.info("DRM: Binding session events", e.sessionId);
                const a = t.getLicenseConfig,
                    o = void 0 === a ? {} : a,
                    c = new yt.ZP;
                return c.linkToSignal(s), (0, r.Z)(e.closed) || e.closed.then((() => c.cancel())).catch((e => {
                    s.isCancelled() || (c.cancel(), n.onError(e))
                })), (0, wn.Dl)(e, (e => {
                    c.cancel(), n.onError(new Hi.Z("KEY_ERROR", e.type))
                }), c.signal), (0, wn.qo)(e, (() => {
                    try {
                        u()
                    } catch (e) {
                        if (s.isCancelled() || c.isUsed() && e instanceof yt.XG) return;
                        c.cancel(), n.onError(e)
                    }
                }), c.signal), (0, wn.RV)(e, (i => {
                    const s = i,
                        a = new Uint8Array(s.message),
                        u = (0, E.Z)(s.messageType) ? s.messageType : "license-request";
                    l.Z.info(`DRM: Received message event, type ${u}`, e.sessionId);
                    var d;
                    xn((() => function (e, i) {
                        let n;
                        return new Promise(((s, a) => {
                            try {
                                l.Z.debug("DRM: Calling `getLicense`", i);
                                const s = t.getLicense(e, i),
                                    d = (0, r.Z)(o.timeout) ? 1e4 : o.timeout;
                                d >= 0 && (n = setTimeout((() => {
                                    a(new Nn(`"getLicense" timeout exceeded (${d} ms)`))
                                }), d)), Promise.resolve(s).then(c, u)
                            } catch (e) {
                                u(e)
                            }

                            function c(e) {
                                void 0 !== n && clearTimeout(n), s(e)
                            }

                            function u(e) {
                                void 0 !== n && clearTimeout(n), a(e)
                            }
                        }))
                    }(a, u)), {
                        totalRetry: null != (d = o.retry) ? d : 2,
                        baseDelay: 200,
                        maxDelay: 3e3,
                        shouldRetry: e => e instanceof Nn || (0, r.Z)(e) || !0 !== e.noRetry,
                        onRetry: e => n.onWarning(Rn(e))
                    }, c.signal).then((t => {
                        if (c.isUsed()) return Promise.resolve();
                        if ((0, r.Z)(t)) l.Z.info("DRM: No license given, skipping session.update");
                        else try {
                            return function (e, t) {
                                return An.apply(this, arguments)
                            }(e, t)
                        } catch (e) {
                            c.cancel(), n.onError(e)
                        }
                    })).catch((e => {
                        if (c.isUsed()) return;
                        c.cancel();
                        const t = Rn(e);
                        if (!(0, r.Z)(e)) {
                            if (!0 === e.fallbackOnLastTry) return l.Z.warn("DRM: Last `getLicense` attempt failed. Blacklisting the current session."), void n.onError(new Mn(t))
                        }
                        n.onError(t)
                    }))
                }), c.signal), void u();

                function u() {
                    if (l.Z.info("DRM: keystatuseschange event received", e.sessionId), c.isUsed() || 0 === e.keyStatuses.size) return;
                    const s = In(e, t, i),
                        a = s.warning,
                        r = s.blacklistedKeyIds,
                        o = s.whitelistedKeyIds;
                    void 0 !== a && (n.onWarning(a), c.isUsed()) || n.onKeyUpdate({
                        whitelistedKeyIds: o,
                        blacklistedKeyIds: r
                    })
                }
            }

            function Rn(e) {
                if (e instanceof Nn) return new Hi.Z("KEY_LOAD_TIMEOUT", "The license server took too much time to respond.");
                const t = new Hi.Z("KEY_LOAD_ERROR", "An error occured when calling `getLicense`.");
                return !(0, r.Z)(e) && (0, E.Z)(e.message) && (t.message = e.message), t
            }

            function An() {
                return (An = ct()((function* (e, t) {
                    l.Z.info("DRM: Updating MediaKeySession with message");
                    try {
                        yield e.update(t)
                    } catch (e) {
                        const t = e instanceof Error ? e.toString() : "`session.update` failed";
                        throw new Hi.Z("KEY_UPDATE_ERROR", t)
                    }
                    l.Z.info("DRM: MediaKeySession update succeeded.")
                }))).apply(this, arguments)
            }
            class Mn extends Error {
                constructor(e) {
                    super(), Object.setPrototypeOf(this, Mn.prototype), this.sessionError = e
                }
            }
            class Nn extends Error {
                constructor(e) {
                    super(), Object.setPrototypeOf(this, Mn.prototype), this.message = e
                }
            }
            var Ln = i(38311);

            function Un() {
                return (Un = ct()((function* (e, t) {
                    try {
                        return yield e.setServerCertificate(t)
                    } catch (e) {
                        l.Z.warn("DRM: mediaKeys.setServerCertificate returned an error", e instanceof Error ? e : "");
                        const t = e instanceof Error ? e.toString() : "`setServerCertificate` error";
                        throw new Hi.Z("LICENSE_SERVER_CERTIFICATE_ERROR", t)
                    }
                }))).apply(this, arguments)
            }

            function On() {
                return On = ct()((function* (e, t) {
                    if (!0 === Tn.hasOne(e)) return l.Z.info("DRM: The MediaKeys already has a server certificate, skipping..."), {
                        type: "already-has-one"
                    };
                    if ("function" != typeof e.setServerCertificate) return l.Z.warn("DRM: Could not set the server certificate. mediaKeys.setServerCertificate is not a function"), {
                        type: "method-not-implemented"
                    };
                    l.Z.info("DRM: Setting server certificate on the MediaKeys"), Tn.prepare(e);
                    try {
                        const i = yield function (e, t) {
                            return Un.apply(this, arguments)
                        }(e, t);
                        return Tn.set(e, t), {
                            type: "success",
                            value: i
                        }
                    } catch (e) {
                        return {
                            type: "error",
                            value: (0, Ln.Z)(e) ? e : new Hi.Z("LICENSE_SERVER_CERTIFICATE_ERROR", "Unknown error when setting the server certificate.")
                        }
                    }
                })), On.apply(this, arguments)
            }
            var zn = i(52059);
            var Kn = i(36944);
            class Fn {
                constructor(e) {
                    this._innerValues = e, this._lazyFormattedValues = null
                }
                constructRequestData() {
                    return (0, Tt.zo)(...this._innerValues.map((e => e.data)))
                }
                isCompatibleWith(e) {
                    const t = e instanceof Fn ? e.getFormattedValues() : e;
                    return gn(this.getFormattedValues(), t)
                }
                getFormattedValues() {
                    return null === this._lazyFormattedValues && (this._lazyFormattedValues = this._innerValues.slice().sort(((e, t) => e.systemId === t.systemId ? 0 : void 0 === e.systemId ? 1 : void 0 === t.systemId || e.systemId < t.systemId ? -1 : 1)).map((({
                        systemId: e,
                        data: t
                    }) => ({
                        systemId: e,
                        data: t,
                        hash: fn(t)
                    })))), this._lazyFormattedValues
                }
            }
            class Bn extends Pi.Z {
                static hasEmeApis() {
                    return !(0, r.Z)(zi.ZP.requestMediaKeySystemAccess)
                }
                constructor(e, t) {
                    super(), l.Z.debug("DRM: Starting ContentDecryptor logic.");
                    const i = new yt.ZP;
                    this._currentSessions = [], this._canceller = i, this._initDataQueue = [], this._stateData = {
                            state: zn.u.Initializing,
                            isMediaKeysAttached: 0,
                            isInitDataQueueLocked: !0,
                            data: null
                        }, this.error = null, zi.ZP.onEncrypted(e, (e => {
                            l.Z.debug("DRM: Encrypted event received from media element.");
                            const t = Vi(e);
                            null !== t && this.onInitializationData(t)
                        }), i.signal),
                        function (e, t, i) {
                            return Sn.apply(this, arguments)
                        }(e, t, i.signal).then((t => {
                            const i = t.options,
                                n = t.mediaKeySystemAccess;
                            let s;
                            var a;
                            ((0, r.Z)(i.persistentLicenseConfig) || !0 === i.persistentLicenseConfig.disableRetroCompatibility) && (a = n.keySystem, s = (0, Kn.Z)(a, "com.microsoft.playready") || "com.chromecast.playready" === a || "com.youtube.playready" === a ? "9a04f07998404286ab92e65be0885f95" : "com.widevine.alpha" === a ? "edef8ba979d64acea3c827dcd51d21ed" : (0, Kn.Z)(a, "com.apple.fps") ? "94ce86fb07ff4f43adb893d2fa968ca2" : (0, Kn.Z)(a, "com.nagra.") ? "adb41c242dbf4a6d958b4457c0d27b95" : void 0), this.systemId = s, this._stateData.state === zn.u.Initializing && (this._stateData = {
                                state: zn.u.WaitingForAttachment,
                                isInitDataQueueLocked: !0,
                                isMediaKeysAttached: 0,
                                data: {
                                    mediaKeysInfo: t,
                                    mediaElement: e
                                }
                            }, this.trigger("stateChange", this._stateData.state))
                        })).catch((e => {
                            this._onFatalError(e)
                        }))
                }
                getState() {
                    return this._stateData.state
                }
                attach() {
                    var e = this;
                    if (this._stateData.state !== zn.u.WaitingForAttachment) throw new Error("`attach` should only be called when in the WaitingForAttachment state");
                    if (0 !== this._stateData.isMediaKeysAttached) return void l.Z.warn("DRM: ContentDecryptor's `attach` method called more than once.");
                    const t = this._stateData.data,
                        i = t.mediaElement,
                        n = t.mediaKeysInfo,
                        s = n.options,
                        a = n.mediaKeys,
                        o = n.mediaKeySystemAccess,
                        c = n.stores;
                    if (!0 === s.disableMediaKeysAttachmentLock && (this._stateData = {
                            state: zn.u.ReadyForContent,
                            isInitDataQueueLocked: !0,
                            isMediaKeysAttached: 1,
                            data: {
                                mediaKeysInfo: n,
                                mediaElement: i
                            }
                        }, this.trigger("stateChange", this._stateData.state), this._isStopped())) return;
                    this._stateData.isMediaKeysAttached = 1;
                    const u = {
                        emeImplementation: zi.ZP,
                        loadedSessionsStore: c.loadedSessionsStore,
                        mediaKeySystemAccess: o,
                        mediaKeys: a,
                        keySystemOptions: s
                    };
                    l.Z.debug("DRM: Attaching current MediaKeys"),
                        function (e, t, i) {
                            return Gi.apply(this, arguments)
                        }(i, u, this._canceller.signal).then(ct()((function* () {
                            e._stateData.isMediaKeysAttached = 2;
                            const t = s.serverCertificate;
                            if (!(0, r.Z)(t)) {
                                const i = yield function (e, t) {
                                    return On.apply(this, arguments)
                                }(a, t);
                                "error" === i.type && e.trigger("warning", i.value)
                            }
                            if (e._isStopped()) return;
                            const i = e._stateData.state;
                            e._stateData = {
                                state: zn.u.ReadyForContent,
                                isMediaKeysAttached: 2,
                                isInitDataQueueLocked: !1,
                                data: {
                                    mediaKeysData: n
                                }
                            }, i !== zn.u.ReadyForContent && e.trigger("stateChange", zn.u.ReadyForContent), e._isStopped() || e._processCurrentInitDataQueue()
                        }))).catch((e => {
                            this._onFatalError(e)
                        }))
                }
                dispose() {
                    this.removeEventListener(), this._stateData = {
                        state: zn.u.Disposed,
                        isMediaKeysAttached: void 0,
                        isInitDataQueueLocked: void 0,
                        data: null
                    }, this._canceller.cancel(), this.trigger("stateChange", this._stateData.state)
                }
                onInitializationData(e) {
                    if (!1 !== this._stateData.isInitDataQueueLocked) {
                        if (this._isStopped()) throw new Error("ContentDecryptor either disposed or stopped.");
                        return void this._initDataQueue.push(e)
                    }
                    const t = this._stateData.data.mediaKeysData,
                        i = Object.assign(Object.assign({}, e), {
                            values: new Fn(e.values)
                        });
                    this._processInitializationData(i, t).catch((e => {
                        this._onFatalError(e)
                    }))
                }
                _processInitializationData(e, t) {
                    var i = this;
                    return ct()((function* () {
                        const n = t.mediaKeySystemAccess,
                            s = t.stores,
                            a = t.options;
                        if (i._tryToUseAlreadyCreatedSession(e, t) || i._isStopped()) return;
                        if ("content" === a.singleLicensePer) {
                            const t = (0, c.Z)(i._currentSessions, (e => "created-session" === e.source));
                            if (void 0 !== t) {
                                const n = e.keyIds;
                                if (void 0 === n) return void(void 0 === e.content ? l.Z.warn("DRM: Unable to fallback from a non-decipherable quality.") : i.trigger("blackListProtectionData", e));
                                if (t.record.associateKeyIds(n), void 0 !== e.content) {
                                    if (l.Z.hasLevel("DEBUG")) {
                                        const e = n.reduce(((e, t) => `${e}, ${(0,k.ci)(t)}`), "");
                                        l.Z.debug("DRM: Blacklisting new key ids", e)
                                    }
                                    i.trigger("keyIdsCompatibilityUpdate", {
                                        whitelistedKeyIds: [],
                                        blacklistedKeyIds: n,
                                        delistedKeyIds: []
                                    })
                                }
                                return
                            }
                        } else if ("periods" === a.singleLicensePer && void 0 !== e.content) {
                            const t = e.content.period,
                                n = i._currentSessions.filter((e => "created-session" === e.source)),
                                s = new Set;
                            Hn(s, t);
                            for (const e of n) {
                                const t = Array.from(s);
                                for (const n of t)
                                    if (e.record.isAssociatedWithKeyId(n)) {
                                        e.record.associateKeyIds(s.values());
                                        for (const i of t) e.keyStatuses.whitelisted.some((e => (0, Ki.Z)(e, i))) || e.keyStatuses.blacklisted.some((e => (0, Ki.Z)(e, i))) || e.keyStatuses.blacklisted.push(i);
                                        return void i.trigger("keyIdsCompatibilityUpdate", {
                                            whitelistedKeyIds: e.keyStatuses.whitelisted,
                                            blacklistedKeyIds: e.keyStatuses.blacklisted,
                                            delistedKeyIds: []
                                        })
                                    }
                            }
                        }
                        let u;
                        i._lockInitDataQueue(), (0, r.Z)(a.persistentLicenseConfig) ? u = "temporary" : ! function (e) {
                            const t = e.getConfiguration(),
                                i = t.sessionTypes;
                            return void 0 !== i && (0, w.Z)(i, "persistent-license")
                        }(n) ? (l.Z.warn('DRM: Cannot create "persistent-license" session: not supported'), u = "temporary") : u = "persistent-license";
                        const d = o.Z.getCurrent(),
                            h = d.EME_DEFAULT_MAX_SIMULTANEOUS_MEDIA_KEY_SESSIONS,
                            m = d.EME_MAX_STORED_PERSISTENT_SESSION_INFORMATION,
                            f = "number" == typeof a.maxSessionCacheSize ? a.maxSessionCacheSize : h,
                            p = yield function (e, t, i, n, s) {
                                return Ji.apply(this, arguments)
                            }(e, s, u, f, i._canceller.signal);
                        if (i._isStopped()) return;
                        const g = {
                            record: p.value.keySessionRecord,
                            source: p.type,
                            keyStatuses: {
                                whitelisted: [],
                                blacklisted: []
                            },
                            blacklistedSessionError: null
                        };
                        i._currentSessions.push(g);
                        const v = p.value,
                            y = v.mediaKeySession,
                            b = v.sessionType;
                        let T = !1;
                        if (Cn(y, a, n.keySystem, {
                                onKeyUpdate: t => {
                                    const n = function (e, t, i, n, s, a) {
                                        var r;
                                        const o = [...s, ...a],
                                            c = t.getAssociatedKeyIds();
                                        for (const e of c) o.some((t => (0, Ki.Z)(t, e))) || (l.Z.hasLevel("DEBUG") && l.Z.debug("DRM: KeySessionRecord's key missing in the license, blacklisting it", (0, k.ci)(e)), o.push(e));
                                        if (void 0 !== i && "init-data" !== i) {
                                            const t = e.keyIds,
                                                s = e.content;
                                            if (void 0 !== t) {
                                                const e = t.filter((e => !o.some((t => (0, Ki.Z)(t, e)))));
                                                e.length > 0 && (l.Z.hasLevel("DEBUG") && l.Z.debug("DRM: init data keys missing in the license, blacklisting them", e.map((e => (0, k.ci)(e))).join(", ")), o.push(...e))
                                            }
                                            if (n && void 0 !== s)
                                                if ("content" === i) {
                                                    const e = new Set,
                                                        t = s.manifest;
                                                    for (const i of t.periods) Hn(e, i);
                                                    Vn(e, o)
                                                } else if ("periods" === i) {
                                                const t = s.manifest;
                                                for (const i of t.periods) {
                                                    const t = new Set;
                                                    if (Hn(t, i), (null === (r = e.content) || void 0 === r ? void 0 : r.period.id) === i.id) Vn(t, o);
                                                    else {
                                                        const e = Array.from(t);
                                                        for (const i of e) {
                                                            if (o.some((e => (0, Ki.Z)(e, i)))) {
                                                                Vn(t, o);
                                                                break
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        return {
                                            whitelisted: s,
                                            blacklisted: o.slice(s.length)
                                        }
                                    }(e, g.record, a.singleLicensePer, "created-session" === g.source, t.whitelistedKeyIds, t.blacklistedKeyIds);
                                    if (g.record.associateKeyIds(n.whitelisted), g.record.associateKeyIds(n.blacklisted), g.keyStatuses = {
                                            whitelisted: n.whitelisted,
                                            blacklisted: n.blacklisted
                                        }, 0 !== g.record.getAssociatedKeyIds().length && "persistent-license" === b && null !== s.persistentSessionsStore && !T) {
                                        const t = s.persistentSessionsStore;
                                        ! function (e, t) {
                                            if (isNaN(t) || t < 0 || t >= e.getLength()) return;
                                            const i = e.getLength(),
                                                n = i - t;
                                            l.Z.info("DRM: Too many stored persistent sessions, removing some.", i, n), e.deleteOldSessions(n)
                                        }(t, m - 1), t.add(e, g.record.getAssociatedKeyIds(), y), T = !0
                                    }
                                    void 0 !== e.content && i.trigger("keyIdsCompatibilityUpdate", {
                                        whitelistedKeyIds: n.whitelisted,
                                        blacklistedKeyIds: n.blacklisted,
                                        delistedKeyIds: []
                                    }), i._unlockInitDataQueue()
                                },
                                onWarning: e => {
                                    i.trigger("warning", e)
                                },
                                onError: t => {
                                    var n;
                                    if (t instanceof Pn) {
                                        l.Z.warn("DRM: A session's closing condition has been triggered"), i._lockInitDataQueue();
                                        const a = i._currentSessions.indexOf(g);
                                        return a >= 0 && i._currentSessions.splice(a), void 0 !== e.content && i.trigger("keyIdsCompatibilityUpdate", {
                                            whitelistedKeyIds: [],
                                            blacklistedKeyIds: [],
                                            delistedKeyIds: g.record.getAssociatedKeyIds()
                                        }), null === (n = s.persistentSessionsStore) || void 0 === n || n.delete(y.sessionId), s.loadedSessionsStore.closeSession(y).catch((e => {
                                            const t = e instanceof Error ? e : "unknown error";
                                            l.Z.warn("DRM: failed to close expired session", t)
                                        })).then((() => i._unlockInitDataQueue())).catch((e => i._onFatalError(e))), void(i._isStopped() || i.trigger("warning", t.reason))
                                    }
                                    t instanceof Mn ? (g.blacklistedSessionError = t, void 0 !== e.content && (l.Z.info("DRM: blacklisting Representations based on protection data."), i.trigger("blackListProtectionData", e)), i._unlockInitDataQueue()) : i._onFatalError(t)
                                }
                            }, i._canceller.signal), void 0 !== a.singleLicensePer && "init-data" !== a.singleLicensePer || i._unlockInitDataQueue(), "created-session" === p.type) {
                            const t = e.values.constructRequestData();
                            try {
                                yield s.loadedSessionsStore.generateLicenseRequest(y, e.type, t)
                            } catch (e) {
                                const t = s.loadedSessionsStore.getEntryForSession(y);
                                if (null === t || "none" !== t.closingStatus.type) {
                                    const e = i._currentSessions.indexOf(g);
                                    return e >= 0 && i._currentSessions.splice(e, 1), Promise.resolve()
                                }
                                throw new Hi.Z("KEY_GENERATE_REQUEST_ERROR", e instanceof Error ? e.toString() : "Unknown error")
                            }
                        }
                        return Promise.resolve()
                    }))()
                }
                _tryToUseAlreadyCreatedSession(e, t) {
                    const i = t.stores,
                        n = t.options,
                        s = (0, c.Z)(this._currentSessions, (t => t.record.isCompatibleWith(e)));
                    if (void 0 === s) return !1;
                    const a = s.blacklistedSessionError;
                    if (!(0, r.Z)(a)) return void 0 === e.type || void 0 === e.content ? (l.Z.error("DRM: This initialization data has already been blacklisted but the current content is not known."), !0) : (l.Z.info("DRM: This initialization data has already been blacklisted. Blacklisting the related content."), this.trigger("blackListProtectionData", e), !0);
                    if (void 0 !== e.keyIds) {
                        let t;
                        if (void 0 === n.singleLicensePer || "init-data" === n.singleLicensePer) {
                            const i = s.keyStatuses.blacklisted;
                            t = function (e, t) {
                                for (const i of e)
                                    if (t.some((e => (0, Ki.Z)(e, i)))) return !0;
                                return !1
                            }(e.keyIds, i)
                        } else {
                            const i = s.keyStatuses.whitelisted;
                            t = !un(e.keyIds, i)
                        }
                        if (t) return void 0 === e.content ? (l.Z.error("DRM: Cannot forbid key id, the content is unknown."), !0) : (l.Z.info("DRM: Current initialization data is linked to blacklisted keys. Marking Representations as not decipherable"), this.trigger("keyIdsCompatibilityUpdate", {
                            whitelistedKeyIds: [],
                            blacklistedKeyIds: e.keyIds,
                            delistedKeyIds: []
                        }), !0)
                    }
                    if (null !== i.loadedSessionsStore.reuse(e)) return l.Z.debug("DRM: Init data already processed. Skipping it."), !0;
                    const o = this._currentSessions.indexOf(s);
                    return -1 === o ? l.Z.error("DRM: Unable to remove processed init data: not found.") : (l.Z.debug("DRM: A session from a processed init data is not available anymore. Re-processing it."), this._currentSessions.splice(o, 1)), !1
                }
                _onFatalError(e) {
                    if (this._canceller.isUsed()) return;
                    const t = e instanceof Error ? e : new bt.Z("NONE", "Unknown decryption error");
                    this.error = t, this._initDataQueue.length = 0, this._stateData = {
                        state: zn.u.Error,
                        isMediaKeysAttached: void 0,
                        isInitDataQueueLocked: void 0,
                        data: null
                    }, this._canceller.cancel(), this.trigger("error", t), this._stateData.state === zn.u.Error && this.trigger("stateChange", this._stateData.state)
                }
                _isStopped() {
                    return this._stateData.state === zn.u.Disposed || this._stateData.state === zn.u.Error
                }
                _processCurrentInitDataQueue() {
                    for (; !1 === this._stateData.isInitDataQueueLocked;) {
                        const e = this._initDataQueue.shift();
                        if (void 0 === e) return;
                        this.onInitializationData(e)
                    }
                }
                _lockInitDataQueue() {
                    !1 === this._stateData.isInitDataQueueLocked && (this._stateData.isInitDataQueueLocked = !0)
                }
                _unlockInitDataQueue() {
                    2 === this._stateData.isMediaKeysAttached ? (this._stateData.isInitDataQueueLocked = !1, this._processCurrentInitDataQueue()) : l.Z.error("DRM: Trying to unlock in the wrong state")
                }
            }

            function Vn(e, t) {
                const i = Array.from(e.values());
                for (const e of i) {
                    t.some((t => (0, Ki.Z)(t, e))) || t.push(e)
                }
            }

            function Hn(e, t) {
                const i = t.adaptations,
                    n = (0, T.T)(i).reduce(((e, t) => (0, r.Z)(t) ? e : e.concat(t)), []);
                for (const t of n)
                    for (const i of t.representations)
                        if (void 0 !== i.contentProtections && void 0 !== i.contentProtections.keyIds)
                            for (const t of i.contentProtections.keyIds) e.add(t.keyId)
            }
            const Wn = Bn;

            function $n(e) {
                e.decrypt = Wn
            }
            var Gn = i(88387),
                Xn = i(77024),
                qn = i(29706);

            function jn(e) {
                e.htmlTextDisplayer = qn.Z
            }
            var Qn = i(48523),
                Yn = i(88845);

            function Jn(e) {
                e.mainThreadMediaSourceInit = n.Z
            }

            function es(e, t) {
                if (xi.vU && function (e, t) {
                        const i = e.activeCues;
                        if (null === i) return !1;
                        for (let e = 0; e < i.length; e++)
                            if (i[e] === t) return !0;
                        return !1
                    }(e, t)) {
                    const i = e.mode;
                    e.mode = "hidden";
                    try {
                        e.removeCue(t)
                    } catch (e) {
                        l.Z.warn("Compat: Could not remove cue from text track.")
                    }
                    e.mode = i
                } else try {
                    e.removeCue(t)
                } catch (e) {
                    l.Z.warn("Compat: Could not remove cue from text track.")
                }
            }
            var ts = i(82520),
                is = i(12553);
            const ns = class {
                constructor(e) {
                    l.Z.debug("NTD: Creating NativeTextDisplayer");
                    const t = function (e) {
                            var t;
                            let i, n;
                            const s = "subtitles";
                            if (xi.YM) {
                                const n = e.textTracks.length;
                                i = n > 0 ? e.textTracks[n - 1] : e.addTextTrack(s), i.mode = null !== (t = i.SHOWING) && void 0 !== t ? t : "showing"
                            } else n = document.createElement("track"), e.appendChild(n), i = n.track, n.kind = s, i.mode = "showing";
                            return {
                                track: i,
                                trackElement: n
                            }
                        }(e),
                        i = t.track,
                        n = t.trackElement;
                    this._buffered = new is.Z, this._videoElement = e, this._track = i, this._trackElement = n
                }
                pushTextData(e) {
                    var t, i;
                    if (l.Z.debug("NTD: Appending new native text tracks"), null === e.chunk) return (0, ts.JN)(this._buffered);
                    const n = e.timestampOffset,
                        s = e.appendWindow,
                        a = e.chunk,
                        r = a.start,
                        o = a.end,
                        c = a.data,
                        u = a.type,
                        d = a.language,
                        h = null !== (t = s[0]) && void 0 !== t ? t : 0,
                        m = null !== (i = s[1]) && void 0 !== i ? i : 1 / 0,
                        f = function (e, t, i, n) {
                            l.Z.debug("NTSB: Finding parser for native text tracks:", e);
                            const s = et.Z.nativeTextTracksParsers[e];
                            if ("function" != typeof s) throw new Error("no parser found for the given text track");
                            l.Z.debug("NTSB: Parser found, parsing...");
                            const a = s(t, i, n);
                            return l.Z.debug("NTSB: Parsed successfully!", a.length), a
                        }(u, c, n, d);
                    if (0 !== h && m !== 1 / 0) {
                        let e = 0;
                        for (; e < f.length && f[e].endTime <= h;) e++;
                        for (f.splice(0, e), e = 0; e < f.length && f[e].startTime < h;) f[e].startTime = h, e++;
                        for (e = f.length - 1; e >= 0 && f[e].startTime >= m;) e--;
                        for (f.splice(e, f.length), e = f.length - 1; e >= 0 && f[e].endTime > m;) f[e].endTime = m, e--
                    }
                    let p, g;
                    if (void 0 !== r) p = Math.max(h, r);
                    else {
                        if (f.length <= 0) return l.Z.warn("NTD: Current text tracks have no cues nor start time. Aborting"), (0, ts.JN)(this._buffered);
                        l.Z.warn("NTD: No start time given. Guessing from cues."), p = f[0].startTime
                    }
                    if (void 0 !== o) g = Math.min(m, o);
                    else {
                        if (f.length <= 0) return l.Z.warn("NTD: Current text tracks have no cues nor end time. Aborting"), (0, ts.JN)(this._buffered);
                        l.Z.warn("NTD: No end time given. Guessing from cues."), g = f[f.length - 1].endTime
                    }
                    if (g <= p) return l.Z.warn("NTD: Invalid text track appended: ", "the start time is inferior or equal to the end time."), (0, ts.JN)(this._buffered);
                    if (f.length > 0) {
                        const e = f[0],
                            t = this._track.cues;
                        null !== t && t.length > 0 && e.startTime < t[t.length - 1].startTime && this._removeData(e.startTime, 1 / 0);
                        for (let e = 0; e < f.length; e++) this._track.addCue(f[e])
                    }
                    return this._buffered.insert(p, g), (0, ts.JN)(this._buffered)
                }
                removeBuffer(e, t) {
                    return this._removeData(e, t), (0, ts.JN)(this._buffered)
                }
                getBufferedRanges() {
                    return (0, ts.JN)(this._buffered)
                }
                reset() {
                    l.Z.debug("NTD: Aborting NativeTextDisplayer"), this._removeData(0, 1 / 0);
                    const e = this._trackElement,
                        t = this._videoElement;
                    if (void 0 !== e && t.hasChildNodes()) try {
                        t.removeChild(e)
                    } catch (e) {
                        l.Z.warn("NTD: Can't remove track element from the video")
                    }
                    const i = this._track.mode;
                    this._track.mode = "disabled", this._track.mode = i, void 0 !== this._trackElement && (this._trackElement.innerHTML = "")
                }
                stop() {
                    l.Z.debug("NTD: Aborting NativeTextDisplayer"), this._removeData(0, 1 / 0);
                    const e = this._trackElement,
                        t = this._videoElement;
                    if (void 0 !== e && t.hasChildNodes()) try {
                        t.removeChild(e)
                    } catch (e) {
                        l.Z.warn("NTD: Can't remove track element from the video")
                    }
                    this._track.mode = "disabled", void 0 !== this._trackElement && (this._trackElement.innerHTML = "")
                }
                _removeData(e, t) {
                    l.Z.debug("NTD: Removing native text track data", e, t);
                    const i = this._track,
                        n = i.cues;
                    if (null !== n)
                        for (let s = n.length - 1; s >= 0; s--) {
                            const a = n[s],
                                r = a.startTime,
                                o = a.endTime;
                            r >= e && r <= t && o <= t && es(i, a)
                        }
                    this._buffered.remove(e, t)
                }
            };

            function ss(e, t, i) {
                if (e >= t) return l.Z.warn(`Compat: Invalid cue times: ${e} - ${t}`), null;
                if ((0, r.Z)(ut.Z.VTTCue)) {
                    if ((0, r.Z)(ut.Z.TextTrackCue)) throw new Error("VTT cues not supported in your target");
                    return new TextTrackCue(e, t, i)
                }
                return new VTTCue(e, t, i)
            }
            const as = /&#([0-9]+);/g,
                rs = /<br>/gi,
                os = /<style[^>]*>([\s\S]*?)<\/style[^>]*>/i,
                ls = /\s*<p (?:class=([^>]+))?>(.*)/i,
                cs = /<sync[^>]+?start="?([0-9]*)"?[^0-9]/i;

            function us(e, t) {
                const i = new RegExp("\\s*" + t + ":\\s*(\\S+);", "i").exec(e);
                return Array.isArray(i) ? i[1] : null
            }
            const ds = function (e, t, i) {
                const n = /<sync[ >]/gi,
                    s = /<sync[ >]|<\/body>/gi,
                    a = [],
                    o = os.exec(e),
                    l = null !== o ? o[1] : "";
                let c, u;
                s.exec(e);
                const d = function (e) {
                    const t = /\.(\S+)\s*{([^}]*)}/gi,
                        i = {};
                    let n = t.exec(e);
                    for (; Array.isArray(n);) {
                        const s = n[1],
                            a = us(n[2], "lang");
                        (0, r.Z)(s) || (0, r.Z)(a) || (i[a] = s), n = t.exec(e)
                    }
                    return i
                }(l);
                let h;
                if ((0, E.Z)(i) && (h = d[i], void 0 === h)) throw new Error(`sami: could not find lang ${i} in CSS`);
                for (; c = n.exec(e), u = s.exec(e), null !== c || null !== u;) {
                    if (null === c || null === u || c.index >= u.index) throw new Error("parse error");
                    const t = e.slice(c.index, u.index),
                        i = cs.exec(t);
                    if (null === i) throw new Error("parse error (sync time attribute)");
                    const n = +i[1];
                    if (isNaN(n)) throw new Error("parse error (sync time attribute NaN)");
                    m(t.split("\n"), n / 1e3)
                }
                return function (e) {
                    const t = [];
                    for (let i = 0; i < e.length; i++) {
                        const n = e[i],
                            s = n.start,
                            a = n.end,
                            o = n.text;
                        if ((0, E.Z)(o) && !(0, r.Z)(a)) {
                            const e = ss(s, a, o);
                            null !== e && t.push(e)
                        }
                    }
                    return t
                }(a);

                function m(e, i) {
                    let n, s = e.length;
                    for (; --s >= 0;) {
                        if (n = ls.exec(e[s]), null === n) continue;
                        const o = n,
                            l = o[1],
                            c = o[2];
                        h === l && ("&nbsp;" === c ? a[a.length - 1].end = i : a.push({
                            text: (r = c, r.replace(rs, "\n").replace(as, ((e, t) => String.fromCharCode(Number(t))))),
                            start: i + t
                        }))
                    }
                    var r
                }
            };

            function hs(e) {
                e.nativeTextTracksParsers.sami = ds, e.nativeTextDisplayer = ns
            }
            var ms = i(94439),
                fs = i(83510);

            function ps(e, t) {
                const i = e.split(/\r\n|\n|\r/),
                    n = (0, ms.Z)(i),
                    s = [];
                for (let e = 0; e < n.length; e++) {
                    const i = (0, fs.Z)(n[e], t);
                    if (null !== i) {
                        const e = gs(i);
                        null !== e && s.push(e)
                    }
                }
                return s
            }

            function gs(e) {
                return ss(e.start, e.end, e.payload.join("\n"))
            }

            function vs(e) {
                e.nativeTextTracksParsers.srt = ps, e.nativeTextDisplayer = ns
            }

            function ys(e) {
                e.nativeTextDisplayer = ns
            }
            var bs = i(69620);

            function Ts(e) {
                return "function" == typeof ut.Z.VTTCue && e instanceof ut.Z.VTTCue
            }
            var ks = i(63026),
                _s = i(88143),
                Ss = i(80063);
            const ws = {
                    left: "start",
                    center: "center",
                    right: "end",
                    start: "start",
                    end: "end"
                },
                Es = {
                    left: "line-left",
                    center: "center",
                    right: "line-right"
                };

            function Ds(e) {
                const t = e.paragraph,
                    i = e.timeOffset,
                    n = e.paragraphStyle,
                    s = e.ttParams,
                    a = e.shouldTrimWhiteSpace;
                if (!t.hasAttribute("begin") && !t.hasAttribute("end") && /^\s*$/.test(null === t.textContent ? "" : t.textContent)) return null;
                const o = (0, ks.Z)(t, s),
                    l = o.start,
                    c = o.end,
                    u = function (e, t) {
                        function i(e, t) {
                            const n = e.childNodes;
                            let s = "";
                            for (let e = 0; e < n.length; e++) {
                                const a = n[e];
                                if ("#text" === a.nodeName) {
                                    let e = a.textContent;
                                    if (null === e && (e = ""), t) {
                                        let t = e.trim();
                                        t = t.replace(/\s+/g, " "), e = t
                                    }
                                    s += e.replace(/&|\u0026/g, "&amp;").replace(/<|\u003C/g, "&lt;").replace(/>|\u2265/g, "&gt;").replace(/\u200E/g, "&lrm;").replace(/\u200F/g, "&rlm;").replace(/\u00A0/g, "&nbsp;")
                                } else if ((0, Ss.OE)(a)) s += "\n";
                                else if ((0, Ss.jg)(a) && a.nodeType === Node.ELEMENT_NODE && a.childNodes.length > 0) {
                                    const e = a.getAttribute("xml:space");
                                    s += i(a, (0, E.Z)(e) ? "default" === e : t)
                                }
                            }
                            return s
                        }
                        return i(e, t)
                    }(t, a),
                    d = ss(l + i, c + i, u);
                return null === d ? null : (Ts(d) && function (e, t) {
                    const i = t.extent;
                    if ((0, E.Z)(i)) {
                        const t = _s._0.exec(i);
                        (0, r.Z)(t) || (e.size = Number(t[1]))
                    }
                    switch (t.writingMode) {
                    case "tb":
                    case "tblr":
                        e.vertical = "lr";
                        break;
                    case "tbrl":
                        e.vertical = "rl"
                    }
                    const n = t.origin;
                    if ((0, E.Z)(n)) {
                        const e = _s._0.exec(n);
                        (0, r.Z)(e)
                    }
                    const s = t.align;
                    if ((0, E.Z)(s)) {
                        e.align = s, "center" === s && ("center" !== e.align && (e.align = "middle"), e.position = "auto");
                        const t = Es[s];
                        e.positionAlign = void 0 === t ? "" : t;
                        const i = ws[s];
                        e.lineAlign = void 0 === i ? "" : i
                    }
                }(d, n), d)
            }
            const xs = function (e, t) {
                const i = (0, bs.Z)(e, t),
                    n = [];
                for (let e = 0; e < i.length; e++) {
                    const t = Ds(i[e]);
                    null !== t && n.push(t)
                }
                return n
            };

            function Ps(e) {
                e.nativeTextTracksParsers.ttml = xs, e.nativeTextDisplayer = ns
            }
            var Zs = i(54807),
                Is = i(73866),
                Cs = i(24575);

            function Rs(e, t) {
                if (!(0, E.Z)(e.vertical) || "rl" !== e.vertical && "lr" !== e.vertical || (t.vertical = e.vertical), (0, E.Z)(e.line)) {
                    const i = /^(\d+(\.\d+)?)%(,([a-z]+))?/.exec(e.line);
                    if (Array.isArray(i)) t.line = Number(i[1]), t.snapToLines = !1, (0, w.Z)(["start", "center", "end"], i[4]) && (t.lineAlign = i[4]);
                    else {
                        const i = /^(-?\d+)(,([a-z]+))?/.exec(e.line);
                        Array.isArray(i) && (t.line = Number(i[1]), t.snapToLines = !0, (0, w.Z)(["start", "center", "end"], i[3]) && (t.lineAlign = i[3]))
                    }
                }
                if ((0, E.Z)(e.position)) {
                    const i = /^([\d\.]+)%(?:,(line-left|line-right|center))?$/.exec(e.position);
                    if (Array.isArray(i) && i.length >= 2) {
                        const e = parseInt(i[1], 10);
                        isNaN(e) || (t.position = e, void 0 !== i[2] && (t.positionAlign = i[2]))
                    }
                }(0, E.Z)(e.size) && (t.size = e.size), "string" == typeof e.align && (0, w.Z)(["start", "center", "end", "left"], e.align) && (t.align = e.align)
            }
            const As = function (e, t) {
                const i = e.split(/\r\n|\n|\r/);
                if (!/^WEBVTT($| |\t)/.test(i[0])) throw new Error("Can't parse WebVTT: Invalid file.");
                const n = (0, Cs.yE)(i),
                    s = (0, Zs.Z)(i, n),
                    a = [];
                for (let e = 0; e < s.length; e++) {
                    const i = (0, Is.Z)(s[e], t);
                    if (null !== i) {
                        const e = ss((r = i).start, r.end, r.payload.join("\n"));
                        null !== e && (Ts(e) && Rs(i.settings, e), a.push(e))
                    }
                }
                var r;
                return a
            };

            function Ms(e) {
                e.nativeTextTracksParsers.vtt = As, e.nativeTextDisplayer = ns
            }
            var Ns = i(41068),
                Ls = i(11074);
            const Us = {};

            function Os(e) {
                if (void 0 !== Us[e]) return Us[e];
                const t = (0, k.tG)(e);
                return Us[e] = t, t
            }

            function zs(e, t) {
                const i = t.length + 8;
                return i <= Ls.s ? (0, Tt.zo)((0, Tt.kh)(i), Os(e), t) : (0, Tt.zo)((0, Tt.kh)(1), Os(e), (0, Tt.el)(i + 8), t)
            }

            function Ks(e, t) {
                return zs(e, (0, Tt.zo)(...t))
            }

            function Fs(e) {
                const t = [];
                e.periods.forEach((i => {
                    const n = i.id;
                    if ((0, w.Z)(t, n)) {
                        l.Z.warn("Two periods with the same ID found. Updating.");
                        const s = n + "-dup";
                        i.id = s, Fs(e), t.push(s)
                    } else t.push(n);
                    const s = i.adaptations,
                        a = [];
                    Object.keys(s).forEach((t => {
                        const i = s[t];
                        void 0 !== i && i.forEach((t => {
                            const i = t.id;
                            if ((0, w.Z)(a, i)) {
                                l.Z.warn("Two adaptations with the same ID found. Updating.", i);
                                const n = i + "-dup";
                                t.id = n, Fs(e), a.push(n)
                            } else a.push(i);
                            const n = [];
                            t.representations.forEach((t => {
                                const i = t.id;
                                if ((0, w.Z)(n, i)) {
                                    l.Z.warn("Two representations with the same ID found. Updating.", i);
                                    const s = `${i}-dup`;
                                    t.id = s, Fs(e), n.push(s)
                                } else n.push(i)
                            }))
                        }))
                    }))
                }))
            }

            function Bs(e) {
                return [{
                    systemId: "edef8ba9-79d6-4ace-a3c8-27dcd51d21ed",
                    privateData: (0, Tt.zo)([8, 1, 18, 16], e)
                }]
            }

            function Vs(e, t = Bs) {
                if (null === e.firstElementChild || "ProtectionHeader" !== e.firstElementChild.nodeName) throw new Error("Protection should have ProtectionHeader child");
                const i = e.firstElementChild,
                    n = (0, Ee.K)(null === i.textContent ? "" : i.textContent),
                    s = function (e) {
                        const t = (0, Tt.qb)(e, 8),
                            i = (0, k.wV)(e.subarray(10, t + 10)),
                            n = (new DOMParser).parseFromString(i, "application/xml").querySelector("KID");
                        if (null === n) throw new Error("Cannot parse PlayReady private data: invalid XML");
                        const s = null === n.textContent ? "" : n.textContent,
                            a = (0, k.wO)((0, Ee.K)(s));
                        return (0, k.ci)(a).toLowerCase()
                    }(n),
                    a = (0, k.nr)(s),
                    r = i.getAttribute("SystemID");
                return {
                    keyId: a,
                    keySystems: [{
                        systemId: (null !== r ? r : "").toLowerCase().replace(/\{|\}/g, ""),
                        privateData: n
                    }].concat(t(a))
                }
            }

            function Hs(e, t) {
                return e.replace(/\{start time\}/g, String(t))
            }

            function Ws(e, t, i) {
                const n = t - e;
                return n > 0 ? Math.floor(n / i) : 0
            }

            function $s(e, t) {
                let i = e.repeatCount;
                if (void 0 !== e.duration && i < 0) {
                    const n = void 0 !== t ? t.start : 1 / 0;
                    i = Math.ceil((n - e.start) / e.duration) - 1
                }
                return i
            }
            class Gs {
                constructor(e) {
                    const t = e.isLive,
                        i = e.segmentPrivateInfos,
                        n = e.media,
                        s = e.sharedSmoothTimeline;
                    if (this._sharedSmoothTimeline = s, this._initSegmentInfos = {
                            bitsPerSample: i.bitsPerSample,
                            channels: i.channels,
                            codecPrivateData: i.codecPrivateData,
                            packetSize: i.packetSize,
                            samplingRate: i.samplingRate,
                            timescale: s.timescale,
                            height: i.height,
                            width: i.width,
                            protection: i.protection
                        }, this._isLive = t, this._media = n, 0 !== s.timeline.length && t) {
                        const e = s.timeline,
                            t = s.validityTime,
                            i = R(e[e.length - 1], null),
                            n = t / 1e3 * s.timescale;
                        this._scaledLiveGap = n - i
                    }
                }
                getInitSegment() {
                    return {
                        id: "init",
                        isInit: !0,
                        privateInfos: {
                            smoothInitSegment: this._initSegmentInfos
                        },
                        url: null,
                        time: 0,
                        end: 0,
                        duration: 0,
                        timescale: 1,
                        complete: !0
                    }
                }
                getSegments(e, t) {
                    this._refreshTimeline();
                    const i = this._sharedSmoothTimeline,
                        n = i.timescale,
                        s = i.timeline,
                        a = function (e, t, i) {
                            const n = void 0 === e || 0 === e ? 1 : e;
                            return {
                                up: t * n,
                                to: (t + i) * n
                            }
                        }(n, e, t),
                        r = a.up,
                        o = a.to,
                        l = this._media;
                    let c;
                    const d = [],
                        h = s.length,
                        m = void 0 === this._scaledLiveGap ? void 0 : (0, u.Z)() / 1e3 * n - this._scaledLiveGap;
                    for (let e = 0; e < h; e++) {
                        const t = s[e],
                            i = t.duration,
                            a = t.start,
                            u = $s(t, s[e + 1]);
                        let h = Ws(a, r, i),
                            f = a + h * i;
                        const p = i;
                        for (; f < o && h <= u && (void 0 === m || f + p <= m);) {
                            const e = f,
                                t = void 0 !== c ? c + h : void 0,
                                s = {
                                    id: String(f),
                                    isInit: !1,
                                    time: e / n,
                                    end: (e + i) / n,
                                    duration: i / n,
                                    timescale: 1,
                                    number: t,
                                    url: Hs(l, e),
                                    complete: !0,
                                    privateInfos: {
                                        smoothMediaSegment: {
                                            time: e,
                                            duration: i
                                        }
                                    }
                                };
                            d.push(s), h++, f = a + h * i
                        }
                        if (f >= o) return d;
                        void 0 !== c && (c += u + 1)
                    }
                    return d
                }
                shouldRefresh(e, t) {
                    if (this._refreshTimeline(), !this._isLive) return !1;
                    const i = this._sharedSmoothTimeline,
                        n = i.timeline,
                        s = i.timescale,
                        a = n[n.length - 1];
                    if (void 0 === a) return !1;
                    const r = a.repeatCount,
                        o = a.start + (r + 1) * a.duration;
                    if (t * s < o) return !1;
                    if (e * s >= o) return !0;
                    return e * s > a.start + r * a.duration
                }
                getFirstAvailablePosition() {
                    this._refreshTimeline();
                    const e = this._sharedSmoothTimeline,
                        t = e.timeline,
                        i = e.timescale;
                    return 0 === t.length ? null : t[0].start / i
                }
                getLastAvailablePosition() {
                    this._refreshTimeline();
                    const e = this._sharedSmoothTimeline,
                        t = e.timeline,
                        i = e.timescale;
                    if (void 0 === this._scaledLiveGap) {
                        return R(t[t.length - 1], null) / i
                    }
                    for (let e = t.length - 1; e >= 0; e--) {
                        const n = t[e],
                            s = (0, u.Z)() / 1e3 * i,
                            a = n.start,
                            r = n.duration;
                        for (let e = n.repeatCount; e >= 0; e--) {
                            const t = a + r * (e + 1);
                            if (t <= s - this._scaledLiveGap) return t / i
                        }
                    }
                }
                getEnd() {
                    if (!this._isLive) return this.getLastAvailablePosition()
                }
                awaitSegmentBetween(e, t) {
                    var i;
                    if ((0, a.ZP)(e <= t), this.isStillAwaitingFutureSegments()) return !1;
                    const n = this.getLastAvailablePosition();
                    return !(void 0 !== n && t < n) && (t > (null !== (i = this.getFirstAvailablePosition()) && void 0 !== i ? i : 0) && void 0)
                }
                checkDiscontinuity(e) {
                    return this._refreshTimeline(), N(this._sharedSmoothTimeline, e, void 0)
                }
                isSegmentStillAvailable(e) {
                    if (e.isInit) return !0;
                    this._refreshTimeline();
                    const t = this._sharedSmoothTimeline,
                        i = t.timeline,
                        n = t.timescale;
                    for (let t = 0; t < i.length; t++) {
                        const s = i[t],
                            a = s.start / n;
                        if (a > e.time) return !1;
                        if (a === e.time) return !0;
                        if (s.repeatCount >= 0 && void 0 !== s.duration) {
                            const e = (a - s.start) / s.duration - 1;
                            return e % 1 == 0 && e <= s.repeatCount
                        }
                    }
                    return !1
                }
                canBeOutOfSyncError(e) {
                    return !!this._isLive && (e instanceof W.Z && (e.isHttpError(404) || e.isHttpError(412)))
                }
                _replace(e) {
                    this._initialScaledLastPosition = e._initialScaledLastPosition, this._scaledLiveGap = e._scaledLiveGap, this._sharedSmoothTimeline.replace(e._sharedSmoothTimeline)
                }
                _update(e) {
                    this._scaledLiveGap = e._scaledLiveGap, this._sharedSmoothTimeline.update(e._sharedSmoothTimeline)
                }
                isStillAwaitingFutureSegments() {
                    return this._isLive
                }
                isInitialized() {
                    return !0
                }
                initialize() {
                    l.Z.error("A `SmoothRepresentationIndex` does not need to be initialized")
                }
                addPredictedSegments(e, t) {
                    this._sharedSmoothTimeline.addPredictedSegments(e, t)
                }
                _refreshTimeline() {
                    this._sharedSmoothTimeline.refresh()
                }
            }

            function Xs(e, t, i, n) {
                const s = e[e.length - 1],
                    a = i.timescale === t ? {
                        time: i.time,
                        duration: i.duration
                    } : {
                        time: i.time / i.timescale * t,
                        duration: i.duration / i.timescale * t
                    };
                return !(n.time === a.time) && (a.time >= R(s, null) && (s.duration === a.duration ? s.repeatCount++ : e.push({
                    duration: a.duration,
                    start: a.time,
                    repeatCount: 0
                }), !0))
            }
            class qs {
                constructor(e) {
                    const t = e.timeline,
                        i = e.timescale,
                        n = e.timeShiftBufferDepth,
                        s = e.manifestReceivedTime;
                    this.timeline = t, this.timescale = i;
                    const a = null != s ? s : (0, u.Z)();
                    if (this.validityTime = a, this._timeShiftBufferDepth = n, 0 !== t.length) {
                        const e = R(t[t.length - 1], null);
                        this._initialScaledLastPosition = e
                    }
                }
                refresh() {
                    if (void 0 === this._initialScaledLastPosition) return;
                    const e = this._timeShiftBufferDepth,
                        t = ((0, u.Z)() - this.validityTime) / 1e3 + this._initialScaledLastPosition / this.timescale;
                    if (void 0 !== e) {
                        const i = (t - e) * this.timescale;
                        $(this.timeline, i)
                    }
                }
                replace(e) {
                    const t = this.timeline,
                        i = e.timeline,
                        n = this.timescale,
                        s = e.timescale;
                    if (this._initialScaledLastPosition = e._initialScaledLastPosition, this.validityTime = e.validityTime, 0 === t.length || 0 === i.length || n !== s) return;
                    const a = t[t.length - 1],
                        r = i[i.length - 1],
                        o = R(r, null);
                    if (!(R(a, null) <= o))
                        for (let e = 0; e < t.length; e++) {
                            const i = t[e],
                                n = R(i, null);
                            if (n === o) return void(this.timeline = this.timeline.concat(t.slice(e + 1)));
                            if (n > o) {
                                if (i.duration !== r.duration) return;
                                const n = o - i.start;
                                if (0 === n) return l.Z.warn("Smooth Parser: a discontinuity detected in the previous manifest has been resolved."), void(this.timeline = this.timeline.concat(t.slice(e)));
                                if (n < 0 || n % i.duration != 0) return;
                                const s = n / i.duration - 1,
                                    a = i.repeatCount - s;
                                if (a < 0) return;
                                r.repeatCount += a;
                                const c = t.slice(e + 1);
                                return void(this.timeline = this.timeline.concat(c))
                            }
                        }
                }
                update(e) {
                    X(this.timeline, e.timeline), this._initialScaledLastPosition = e._initialScaledLastPosition, this.validityTime = e.validityTime
                }
                addPredictedSegments(e, t) {
                    var i;
                    if (void 0 !== (null === (i = t.privateInfos) || void 0 === i ? void 0 : i.smoothMediaSegment)) {
                        this.refresh();
                        for (let i = 0; i < e.length; i++) Xs(this.timeline, this.timescale, e[i], t.privateInfos.smoothMediaSegment)
                    } else l.Z.warn("Smooth Parser: should only encounter SmoothRepresentationIndex")
                }
            }

            function js(e, t, i) {
                let n = e.firstElementChild,
                    s = i;
                for (; null !== n;) s = t(s, n.nodeName, n), n = n.nextElementSibling;
                return s
            }
            const Qs = {
                    audio: "audio/mp4",
                    video: "video/mp4",
                    text: "application/ttml+xml"
                },
                Ys = {
                    AACL: "audio/mp4",
                    AVC1: "video/mp4",
                    H264: "video/mp4",
                    TTML: "application/ttml+xml+mp4",
                    DFXP: "application/ttml+xml+mp4"
                };
            const Js = function (e = {}) {
                    const t = void 0 === e.referenceDateTime ? Date.UTC(1970, 0, 1, 0, 0, 0, 0) / 1e3 : e.referenceDateTime,
                        i = void 0 === e.minRepresentationBitrate ? 0 : e.minRepresentationBitrate,
                        n = e.serverSyncInfos,
                        s = void 0 !== n ? n.serverTimestamp - n.clientTime : void 0;

                    function o(e, t) {
                        const i = js(e, ((e, t, i) => ("CustomAttributes" === t && e.push(...js(i, ((e, t, i) => {
                            if ("Attribute" === t) {
                                const t = i.getAttribute("Name"),
                                    n = i.getAttribute("Value");
                                null !== t && null !== n && e.push(t + "=" + n)
                            }
                            return e
                        }), [])), e)), []);

                        function n(t) {
                            const i = e.getAttribute(t);
                            return null === i ? void 0 : i
                        }
                        switch (t) {
                        case "audio": {
                            const e = n("AudioTag"),
                                t = n("BitsPerSample"),
                                s = n("Channels"),
                                a = n("CodecPrivateData"),
                                r = n("FourCC"),
                                o = n("PacketSize"),
                                c = n("SamplingRate"),
                                u = n("Bitrate");
                            let d = void 0 === u ? 0 : parseInt(u, 10);
                            if (d = isNaN(d) ? 0 : d, void 0 !== r && void 0 === Ys[r] || void 0 === a) return l.Z.warn("Smooth parser: Unsupported audio codec. Ignoring quality level."), null;
                            const h = function (e, t) {
                                let i;
                                return i = "AACH" === t ? 5 : (0, E.Z)(e) ? (248 & parseInt(e.substring(0, 2), 16)) >> 3 : 2, 0 === i ? "mp4a.40.2" : `mp4a.40.${i}`
                            }(a, r);
                            return {
                                audiotag: void 0 !== e ? parseInt(e, 10) : e,
                                bitrate: d,
                                bitsPerSample: void 0 !== t ? parseInt(t, 10) : t,
                                channels: void 0 !== s ? parseInt(s, 10) : s,
                                codecPrivateData: a,
                                codecs: h,
                                customAttributes: i,
                                mimeType: void 0 !== r ? Ys[r] : r,
                                packetSize: void 0 !== o ? parseInt(o, 10) : o,
                                samplingRate: void 0 !== c ? parseInt(c, 10) : c
                            }
                        }
                        case "video": {
                            const e = n("CodecPrivateData"),
                                t = n("FourCC"),
                                s = n("MaxWidth"),
                                a = n("MaxHeight"),
                                r = n("Bitrate");
                            let o = void 0 === r ? 0 : parseInt(r, 10);
                            if (o = isNaN(o) ? 0 : o, void 0 !== t && void 0 === Ys[t] || void 0 === e) return l.Z.warn("Smooth parser: Unsupported video codec. Ignoring quality level."), null;
                            const c = function (e) {
                                const t = /00000001\d7([0-9a-fA-F]{6})/.exec(e);
                                return null !== t && (0, E.Z)(t[1]) ? "avc1." + t[1] : "avc1.4D401E"
                            }(e);
                            return {
                                bitrate: o,
                                customAttributes: i,
                                mimeType: void 0 !== t ? Ys[t] : t,
                                codecPrivateData: e,
                                codecs: c,
                                width: void 0 !== s ? parseInt(s, 10) : void 0,
                                height: void 0 !== a ? parseInt(a, 10) : void 0
                            }
                        }
                        case "text": {
                            const e = n("CodecPrivateData"),
                                t = n("FourCC"),
                                s = n("Bitrate");
                            let a = void 0 === s ? 0 : parseInt(s, 10);
                            return a = isNaN(a) ? 0 : a, {
                                bitrate: a,
                                customAttributes: i,
                                mimeType: void 0 !== t ? Ys[t] : t,
                                codecPrivateData: null != e ? e : ""
                            }
                        }
                        default:
                            return l.Z.error("Smooth Parser: Unrecognized StreamIndex type: " + t), null
                        }
                    }

                    function c(e) {
                        const t = e.root,
                            n = e.timescale,
                            s = e.baseUrl,
                            c = e.protections,
                            u = e.timeShiftBufferDepth,
                            d = e.manifestReceivedTime,
                            h = e.isLive,
                            m = t.getAttribute("Timescale");
                        let f = null === m ? n : +m;
                        isNaN(f) && (f = n);
                        const p = t.getAttribute("Type");
                        if (null === p) throw new Error("StreamIndex without type.");
                        (0, w.Z)(_.rX, p) || l.Z.warn("Smooth Parser: Unrecognized adaptation type:", p);
                        const g = p,
                            v = t.getAttribute("Subtype"),
                            y = t.getAttribute("Language"),
                            b = t.getAttribute("Url"),
                            T = null === b ? "" : b;
                        const S = js(t, ((e, t, n) => {
                                switch (t) {
                                case "QualityLevel":
                                    const t = o(n, g);
                                    if (null === t) return e;
                                    ("video" !== g || t.bitrate > i) && e.qualityLevels.push(t);
                                    break;
                                case "c":
                                    e.cNodes.push(n)
                                }
                                return e
                            }), {
                                qualityLevels: [],
                                cNodes: []
                            }),
                            D = S.qualityLevels,
                            x = S.cNodes,
                            P = new qs({
                                timeline: (I = x, I.reduce(((e, t, i) => {
                                    const n = t.getAttribute("d"),
                                        s = t.getAttribute("t"),
                                        a = t.getAttribute("r"),
                                        r = null !== a ? +a - 1 : 0;
                                    let o = null !== s ? +s : void 0,
                                        l = null !== n ? +n : void 0;
                                    if (0 === i) o = void 0 === o || isNaN(o) ? 0 : o;
                                    else {
                                        const t = e[i - 1];
                                        if (void 0 === o || isNaN(o)) {
                                            if (void 0 === t.duration || isNaN(t.duration)) throw new Error("Smooth: Invalid CNodes. Missing timestamp.");
                                            o = t.start + t.duration * (t.repeatCount + 1)
                                        }
                                    }
                                    if (void 0 === l || isNaN(l)) {
                                        const t = I[i + 1];
                                        if (void 0 === t) return e; {
                                            const e = t.getAttribute("t"),
                                                i = (0, E.Z)(e) ? +e : null;
                                            if (null === i) throw new Error("Can't build index timeline from Smooth Manifest.");
                                            l = i - o
                                        }
                                    }
                                    return e.push({
                                        duration: l,
                                        start: o,
                                        repeatCount: r
                                    }), e
                                }), [])),
                                timescale: f,
                                timeShiftBufferDepth: u,
                                manifestReceivedTime: d
                            });
                        var I;
                        (0, a.ZP)(0 !== D.length, "Adaptation should have at least one playable representation.");
                        const C = g + ((0, E.Z)(y) ? "_" + y : ""),
                            R = D.map((e => {
                                const t = (i = T, n = e.bitrate, a = e.customAttributes, i.replace(/\{bitrate\}/g, String(n)).replace(/{CustomAttributes}/g, a.length > 0 ? a[0] : ""));
                                var i, n, a;
                                const o = (0, E.Z)(e.mimeType) ? e.mimeType : Qs[g],
                                    l = e.codecs,
                                    u = C + "_" + ((0, r.Z)(g) ? "" : g + "-") + ((0, r.Z)(o) ? "" : o + "-") + ((0, r.Z)(l) ? "" : l + "-") + String(e.bitrate),
                                    d = [];
                                let m;
                                c.length > 0 && (m = c[0], c.forEach((e => {
                                    const t = e.keyId;
                                    e.keySystems.forEach((e => {
                                        d.push({
                                            keyId: t,
                                            systemId: e.systemId
                                        })
                                    }))
                                })));
                                const f = {
                                        bitsPerSample: e.bitsPerSample,
                                        channels: e.channels,
                                        codecPrivateData: e.codecPrivateData,
                                        packetSize: e.packetSize,
                                        samplingRate: e.samplingRate,
                                        height: e.height,
                                        width: e.width,
                                        protection: (0, r.Z)(m) ? void 0 : {
                                            keyId: m.keyId
                                        }
                                    },
                                    p = new Gs({
                                        isLive: h,
                                        sharedSmoothTimeline: P,
                                        media: t,
                                        segmentPrivateInfos: f
                                    }),
                                    v = (0, Z.Z)({}, e, {
                                        index: p,
                                        cdnMetadata: [{
                                            baseUrl: s
                                        }],
                                        mimeType: o,
                                        codecs: l,
                                        id: u
                                    });
                                if (d.length > 0 || void 0 !== m) {
                                    const e = void 0 === m ? [] : m.keySystems.map((e => {
                                        const t = e.systemId,
                                            i = e.privateData,
                                            n = t.replace(/-/g, ""),
                                            s = function (e, t) {
                                                if (32 !== e.length) throw new Error("HSS: wrong system id length");
                                                const i = 0;
                                                return zs("pssh", (0, Tt.zo)([i, 0, 0, 0], (0, k.nr)(e), (0, Tt.kh)(t.length), t))
                                            }(n, i);
                                        return {
                                            systemId: n,
                                            data: s
                                        }
                                    }));
                                    if (e.length > 0) {
                                        const t = [{
                                            type: "cenc",
                                            values: e
                                        }];
                                        v.contentProtections = {
                                            keyIds: d,
                                            initData: t
                                        }
                                    } else v.contentProtections = {
                                        keyIds: d,
                                        initData: []
                                    }
                                }
                                return v
                            }));
                        if ("ADVT" === v) return null;
                        const A = {
                            id: C,
                            type: g,
                            representations: R,
                            language: null === y ? void 0 : y
                        };
                        return "text" === g && "DESC" === v && (A.closedCaption = !0), A
                    }
                    return function (i, n, a) {
                        let o = "";
                        if (void 0 !== n) {
                            const e = (0, d.$)(n);
                            o = n.substring(0, e)
                        }
                        const l = i.documentElement;
                        if ((0, r.Z)(l) || "SmoothStreamingMedia" !== l.nodeName) throw new Error("document root should be SmoothStreamingMedia");
                        const h = l.getAttribute("MajorVersion"),
                            m = l.getAttribute("MinorVersion");
                        if (null === h || null === m || !/^[2]-[0-2]$/.test(h + "-" + m)) throw new Error("Version should be 2.0, 2.1 or 2.2");
                        const f = l.getAttribute("Timescale");
                        let p = (0, E.Z)(f) ? +f : 1e7;
                        isNaN(p) && (p = 1e7);
                        const g = js(l, ((t, i, n) => {
                                switch (i) {
                                case "Protection":
                                    t.protections.push(Vs(n, e.keySystems));
                                    break;
                                case "StreamIndex":
                                    t.adaptationNodes.push(n)
                                }
                                return t
                            }), {
                                adaptationNodes: [],
                                protections: []
                            }),
                            v = g.protections,
                            y = g.adaptationNodes,
                            b = "boolean" == typeof (T = l.getAttribute("IsLive")) ? T : "string" == typeof T && "TRUE" === T.toUpperCase();
                        var T;
                        let k;
                        if (b) {
                            const e = l.getAttribute("DVRWindowLength");
                            null === e || isNaN(+e) || 0 == +e || (k = +e / p)
                        }
                        const _ = y.reduce(((e, t) => {
                            const i = c({
                                root: t,
                                baseUrl: o,
                                timescale: p,
                                protections: v,
                                isLive: b,
                                timeShiftBufferDepth: k,
                                manifestReceivedTime: a
                            });
                            if (null === i) return e;
                            const n = i.type,
                                s = e[n];
                            return void 0 === s ? e[n] = [i] : s.push(i), e
                        }), {});
                        let S, w, D, x, P = null;
                        const Z = void 0 !== _.video ? _.video[0] : void 0,
                            I = void 0 !== _.audio ? _.audio[0] : void 0;
                        let C, R, A;
                        if (void 0 !== Z || void 0 !== I) {
                            const e = [],
                                t = [];
                            if (void 0 !== Z) {
                                const i = Z.representations[0];
                                if (void 0 !== i) {
                                    const n = i.index.getFirstAvailablePosition(),
                                        s = i.index.getLastAvailablePosition();
                                    (0, r.Z)(n) || e.push(n), (0, r.Z)(s) || t.push(s)
                                }
                            }
                            if (void 0 !== I) {
                                const i = I.representations[0];
                                if (void 0 !== i) {
                                    const n = i.index.getFirstAvailablePosition(),
                                        s = i.index.getLastAvailablePosition();
                                    (0, r.Z)(n) || e.push(n), (0, r.Z)(s) || t.push(s)
                                }
                            }
                            e.length > 0 && (C = Math.max(...e)), t.length > 0 && (R = Math.min(...t), A = Math.max(...t))
                        }
                        const M = l.getAttribute("Duration"),
                            N = null !== M && 0 != +M ? +M / p : void 0;
                        if (b) {
                            S = e.suggestedPresentationDelay, w = t, D = null != C ? C : w;
                            let i = A;
                            void 0 === i && (i = Date.now() / 1e3 - w);
                            let n = R;
                            void 0 === n && (n = i), x = {
                                isLinear: !0,
                                maximumSafePosition: n,
                                livePosition: i,
                                time: (0, u.Z)()
                            }, P = null != k ? k : null
                        } else {
                            D = null != C ? C : 0;
                            let e = R;
                            void 0 === e && (e = void 0 !== N ? D + N : 1 / 0), x = {
                                isLinear: !1,
                                maximumSafePosition: e,
                                livePosition: void 0,
                                time: (0, u.Z)()
                            }
                        }
                        const L = b ? 0 : D,
                            U = b ? void 0 : x.maximumSafePosition,
                            O = {
                                availabilityStartTime: void 0 === w ? 0 : w,
                                clockOffset: s,
                                isLive: b,
                                isDynamic: b,
                                isLastPeriodKnown: !0,
                                timeBounds: {
                                    minimumSafePosition: D,
                                    timeshiftDepth: P,
                                    maximumTimeData: x
                                },
                                periods: [{
                                    adaptations: _,
                                    duration: void 0 !== U ? U - L : N,
                                    end: U,
                                    id: "gen-smooth-period-0",
                                    start: L
                                }],
                                suggestedPresentationDelay: S,
                                transportType: "smooth",
                                uris: (0, r.Z)(n) ? [] : [n]
                            };
                        return Fs(O), O
                    }
                },
                ea = Js;

            function ta(e, t, i, n, s) {
                var a;
                const r = [];
                let o, c, u;
                if (s) {
                    const t = (0, Ns.XA)(e);
                    null !== t ? (u = function (e) {
                        const t = (0, nn.nR)(e, 3565190898, 3392751253, 2387879627, 2655430559);
                        if (void 0 === t) return [];
                        const i = [],
                            n = t[0],
                            s = t[4];
                        for (let e = 0; e < s; e++) {
                            let s, a;
                            1 === n ? (a = (0, Tt.pV)(t, 16 * e + 5), s = (0, Tt.pV)(t, 16 * e + 5 + 8)) : (a = (0, Tt.pX)(t, 8 * e + 5), s = (0, Tt.pX)(t, 8 * e + 5 + 4)), i.push({
                                time: a,
                                duration: s
                            })
                        }
                        return i
                    }(t), c = function (e) {
                        const t = (0, nn.nR)(e, 1830656773, 1121273062, 2162299933, 2952222642);
                        if (void 0 !== t) return {
                            duration: (0, Tt.pV)(t, 12),
                            time: (0, Tt.pV)(t, 4)
                        }
                    }(t)) : l.Z.warn("smooth: could not find traf atom")
                }
                if (void 0 !== u)
                    for (let e = 0; e < u.length; e++) r.push({
                        time: u[e].time,
                        duration: u[e].duration,
                        timescale: i
                    });
                if (void 0 !== c) return o = {
                    time: c.time / i,
                    duration: c.duration / i
                }, {
                    nextSegments: r,
                    chunkInfos: o,
                    scaledSegmentTime: c.time
                };
                if (t || !n.complete) return {
                    nextSegments: r,
                    chunkInfos: null,
                    scaledSegmentTime: void 0
                };
                const d = n.duration * i,
                    h = Math.min(.9 * i, d / 4),
                    m = (0, Zt.MM)(e),
                    f = void 0 !== (null === (a = n.privateInfos) || void 0 === a ? void 0 : a.smoothMediaSegment) ? n.privateInfos.smoothMediaSegment.time : Math.round(n.time * i);
                return o = void 0 !== m && Math.abs(m - d) <= h ? {
                    time: n.time,
                    duration: m / i
                } : {
                    time: n.time,
                    duration: n.duration
                }, {
                    nextSegments: r,
                    chunkInfos: o,
                    scaledSegmentTime: f
                }
            }

            function ia(e) {
                return "string" == typeof e && e.indexOf("mp4") >= 0
            }

            function na(e, t) {
                return zs("schm", (0, Tt.zo)(4, (0, k.tG)(e), (0, Tt.kh)(t)))
            }

            function sa(e) {
                return zs("frma", (0, k.tG)(e))
            }

            function aa(e) {
                const t = [7, [e.length]];
                return zs("stsd", (0, Tt.zo)(...t.concat(e)))
            }

            function ra(e, t, i) {
                return zs("tenc", (0, Tt.zo)(6, [e, t], i))
            }

            function oa(e, t, i, n, s) {
                const a = [e, t, i];
                return void 0 !== s && a.push(zs("senc", s), function (e) {
                    if (0 === e.length) return zs("saiz", new Uint8Array(0));
                    const t = (0, Tt.pX)(e, 0),
                        i = (0, Tt.pX)(e, 4),
                        n = new Uint8Array(i + 9);
                    n.set((0, Tt.kh)(i), 5);
                    let s, a, r = 9,
                        o = 8;
                    for (; o < e.length;) o += 8, 2 == (2 & t) ? (a = 2, s = (0, Tt.zK)(e, o), o += 6 * s + 2) : (s = 0, a = 0), n[r] = 6 * s + 8 + a, r++;
                    return zs("saiz", n)
                }(s), function (e, t, i, n) {
                    return zs("saio", (0, Tt.zo)(4, [0, 0, 0, 1], (0, Tt.kh)(e.length + t.length + i.length + n.length + 8 + 8 + 8 + 8)))
                }(n, e, t, i)), Ks("traf", a)
            }

            function la(e, t) {
                const i = (0, nn.Qy)(e, 1836019558);
                if (null === i) throw new Error("Smooth: Invalid ISOBMFF given");
                const n = e.subarray(i[1], i[2]),
                    s = (0, nn.iz)(n, 1835427940),
                    a = (0, nn.t_)(n, 1953653094);
                if (null === a || null === s) throw new Error("Smooth: Invalid ISOBMFF given");
                const r = (0, nn.Qy)(a, 1952868452),
                    o = (0, nn.Qy)(a, 1953658222);
                if (null === r || null === o) throw new Error("Smooth: Invalid ISOBMFF given");
                const l = a.subarray(r[0], r[2]),
                    c = a.subarray(o[0], o[2]);
                l.set([0, 0, 0, 1], r[1] - r[0] + 4);
                const u = function (e) {
                        return zs("tfdt", (0, Tt.zo)([1, 0, 0, 0], (0, Tt.el)(e)))
                    }(t),
                    d = function (e, t) {
                        const i = (1 & e[t + 3]) > 0;
                        if (i) return e;
                        const n = new Uint8Array(e.length + 4);
                        return n.set(e.subarray(0, t + 8), 0), n[t + 3] = 1 | n[t + 3], n.set([0, 0, 0, 0], t + 8), n.set(e.subarray(t + 8, e.length), t + 12), (0, Zt.J6)(n)
                    }(c, o[1] - o[0]),
                    h = oa(l, u, d, s, (0, nn.nR)(a, 2721664850, 1520127764, 2722393154, 2086964724)),
                    m = Ks("moof", [s, h]),
                    f = (0, nn.Qy)(m, 1836019558),
                    p = (0, nn.Qy)(h, 1953653094),
                    g = (0, nn.Qy)(d, 1953658222);
                if (null === f || null === p || null === g) throw new Error("Smooth: Invalid moof, trun or traf generation");
                const v = f[1] - f[0] + s.length + (p[1] - p[0]) + l.length + u.length + (g[1] - g[0]) + 8,
                    y = i[2] - i[0],
                    b = m.length - y,
                    T = (0, nn.Qy)(e, 1835295092);
                if (null === T) throw new Error("Smooth: Invalid ISOBMFF given");
                if (!xi.YM && (0 === b || b <= -8)) {
                    const t = T[1];
                    return m.set((0, Tt.kh)(t), v), e.set(m, i[0]), b <= -8 && e.set(zs("free", new Uint8Array(-b - 8)), m.length), e
                } {
                    const t = T[1] + b;
                    m.set((0, Tt.kh)(t), v);
                    const n = new Uint8Array(e.length + b),
                        s = e.subarray(0, i[0]),
                        a = e.subarray(i[2], e.length);
                    return n.set(s, 0), n.set(m, s.length), n.set(a, s.length + m.length), n
                }
            }

            function ca(e, t, i, n, s, a) {
                const r = Ks("stbl", [i, zs("stts", new Uint8Array(8)), zs("stsc", new Uint8Array(8)), zs("stsz", new Uint8Array(12)), zs("stco", new Uint8Array(8))]),
                    o = function (e) {
                        return zs("dref", (0, Tt.zo)(7, [1], e))
                    }(zs("url ", new Uint8Array([0, 0, 0, 1]))),
                    l = Ks("dinf", [o]),
                    c = Ks("minf", [n, l, r]),
                    u = function (e) {
                        let t, i;
                        switch (e) {
                        case "video":
                            t = "vide", i = "VideoHandler";
                            break;
                        case "audio":
                            t = "soun", i = "SoundHandler";
                            break;
                        default:
                            t = "hint", i = ""
                        }
                        return zs("hdlr", (0, Tt.zo)(8, (0, k.tG)(t), 12, (0, k.tG)(i), 1))
                    }(t),
                    d = function (e) {
                        return zs("mdhd", (0, Tt.zo)(12, (0, Tt.kh)(e), 8))
                    }(e),
                    h = Ks("mdia", [d, u, c]),
                    m = function (e, t, i) {
                        return zs("tkhd", (0, Tt.zo)((0, Tt.kh)(7), 8, (0, Tt.kh)(i), 20, [1, 0, 0, 0], [0, 1, 0, 0], 12, [0, 1, 0, 0], 12, [64, 0, 0, 0], (0, Tt.XT)(e), 2, (0, Tt.XT)(t), 2))
                    }(s, a, 1),
                    f = Ks("trak", [m, h]);
                var p;
                const g = Ks("mvex", [(p = 1, zs("trex", (0, Tt.zo)(4, (0, Tt.kh)(p), [0, 0, 0, 1], 12)))]),
                    v = function (e, t) {
                        return zs("mvhd", (0, Tt.zo)(12, (0, Tt.kh)(e), 4, [0, 1], 2, [1, 0], 10, [0, 1], 14, [0, 1], 14, [64, 0, 0, 0], 26, (0, Tt.XT)(t + 1)))
                    }(e, 1),
                    y = function (e, t, i) {
                        return Ks("moov", [e, t, i])
                    }(v, g, f),
                    b = (T = "isom", _ = ["isom", "iso2", "iso6", "avc1", "dash"], zs("ftyp", (0, Tt.zo)(...[(0, k.tG)(T), [0, 0, 0, 1]].concat(_.map(k.tG)))));
                var T, _;
                return (0, Tt.zo)(b, y)
            }

            function ua(e, t, i, n, s, a, r, o) {
                const l = r.split("00000001"),
                    c = l[1],
                    u = l[2];
                if (void 0 === c || void 0 === u) throw new Error("Smooth: unsupported codec private data.");
                const d = function (e, t, i) {
                    let n;
                    n = 2 === i ? 1 : 4 === i ? 3 : 0;
                    const s = e[1],
                        a = e[2],
                        r = e[3];
                    return zs("avcC", (0, Tt.zo)([1, s, a, r, 252 | n, 225], (0, Tt.XT)(e.length), e, [1], (0, Tt.XT)(t.length), t))
                }((0, k.nr)(c), (0, k.nr)(u), a);
                let h;
                if (void 0 === o) {
                    const e = function (e, t, i, n, s, a, r) {
                        return zs("avc1", (0, Tt.zo)(6, (0, Tt.XT)(1), 16, (0, Tt.XT)(e), (0, Tt.XT)(t), (0, Tt.XT)(i), 2, (0, Tt.XT)(n), 6, [0, 1, s.length], (0, k.tG)(s), 31 - s.length, (0, Tt.XT)(a), [255, 255], r))
                    }(t, i, n, s, "AVC Coding", 24, d);
                    h = aa([e])
                } else {
                    const e = Ks("schi", [ra(1, 8, o)]),
                        a = na("cenc", 65536),
                        r = function (e, t, i, n, s, a, r, o) {
                            return zs("encv", (0, Tt.zo)(6, (0, Tt.XT)(1), 16, (0, Tt.XT)(e), (0, Tt.XT)(t), (0, Tt.XT)(i), 2, (0, Tt.XT)(n), 6, [0, 1, s.length], (0, k.tG)(s), 31 - s.length, (0, Tt.XT)(a), [255, 255], r, o))
                        }(t, i, n, s, "AVC Coding", 24, d, Ks("sinf", [sa("avc1"), a, e]));
                    h = aa([r])
                }
                return ca(e, "video", h, function () {
                    const e = new Uint8Array(12);
                    return e[3] = 1, zs("vmhd", e)
                }(), t, i)
            }
            const da = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];

            function ha(e, t, i, n, s, a, r) {
                const o = function (e, t) {
                        return zs("esds", (0, Tt.zo)(4, [3, 25], (0, Tt.XT)(e), [0, 4, 17, 64, 21], 11, [5, 2], (0, k.nr)(t), [6, 1, 2]))
                    }(1, 0 === a.length ? function (e, t, i) {
                        let n;
                        return n = (63 & e) << 4, n = (n | 31 & da.indexOf(t)) << 4, n = (n | 31 & i) << 3, (0, k.ci)((0, Tt.XT)(n))
                    }(2, s, t) : a),
                    l = (() => {
                        if (void 0 === r) {
                            const e = function (e, t, i, n, s, a) {
                                return zs("mp4a", (0, Tt.zo)(6, (0, Tt.XT)(e), 8, (0, Tt.XT)(t), (0, Tt.XT)(i), 2, (0, Tt.XT)(n), (0, Tt.XT)(s), 2, a))
                            }(1, t, i, n, s, o);
                            return aa([e])
                        }
                        const e = Ks("schi", [ra(1, 8, r)]),
                            a = na("cenc", 65536),
                            l = Ks("sinf", [sa("mp4a"), a, e]),
                            c = function (e, t, i, n, s, a, r) {
                                return zs("enca", (0, Tt.zo)(6, (0, Tt.XT)(e), 8, (0, Tt.XT)(t), (0, Tt.XT)(i), 2, (0, Tt.XT)(n), (0, Tt.XT)(s), 2, a, r))
                            }(1, t, i, n, s, o, l);
                        return aa([c])
                    })();
                return ca(e, "audio", l, zs("smhd", new Uint8Array(8)), 0, 0)
            }

            function ma(e, t, i, n, s, a) {
                let r;
                const o = t.segment.range;
                return Array.isArray(o) && (r = {
                    Range: gt(o)
                }), (0, tt.ZP)({
                    url: e,
                    responseType: "arraybuffer",
                    headers: r,
                    timeout: n.timeout,
                    connectionTimeout: n.connectionTimeout,
                    cancelSignal: s,
                    onProgress: i.onProgress
                }).then((e => {
                    if (!ia(t.mimeType) || !0 !== a) return {
                        resultType: "segment-loaded",
                        resultData: e
                    };
                    const i = new Uint8Array(e.responseData);
                    return _t(i, t.segment.isInit), {
                        resultType: "segment-loaded",
                        resultData: Object.assign(Object.assign({}, e), {
                            responseData: i
                        })
                    }
                }))
            }
            const fa = ({
                checkMediaSegmentIntegrity: e,
                segmentLoader: t
            }) => (i, n, s, a, r) => {
                const o = n.segment;
                if (o.isInit) {
                    if (void 0 === o.privateInfos || void 0 === o.privateInfos.smoothInitSegment) throw new Error("Smooth: Invalid segment format");
                    const e = o.privateInfos.smoothInitSegment;
                    let t;
                    const i = e.codecPrivateData,
                        s = e.timescale,
                        a = e.height,
                        r = e.width,
                        l = e.protection,
                        c = void 0 === l ? {
                            keyId: void 0,
                            keySystems: void 0
                        } : l;
                    if (void 0 === i) throw new Error("Smooth: no codec private data.");
                    switch (n.type) {
                    case "video":
                        t = ua(s, null != r ? r : 0, null != a ? a : 0, 72, 72, 4, i, c.keyId);
                        break;
                    case "audio": {
                        const n = e.channels,
                            a = void 0 === n ? 0 : n,
                            r = e.bitsPerSample,
                            o = void 0 === r ? 0 : r,
                            l = e.packetSize,
                            u = void 0 === l ? 0 : l,
                            d = e.samplingRate;
                        t = ha(s, a, o, u, void 0 === d ? 0 : d, i, c.keyId);
                        break
                    }
                    default:
                        0, t = new Uint8Array(0)
                    }
                    return Promise.resolve({
                        resultType: "segment-created",
                        resultData: t
                    })
                }
                return null === i ? Promise.resolve({
                    resultType: "segment-created",
                    resultData: null
                }) : "function" != typeof t ? ma(i, n, r, s, a, e) : new Promise(((o, l) => {
                    let c = !1;
                    const u = {
                        reject: e => {
                            var t, i;
                            if (c || a.isCancelled()) return;
                            c = !0, a.deregister(f);
                            const n = e,
                                s = null !== (t = null == n ? void 0 : n.message) && void 0 !== t ? t : "Unknown error when fetching a Smooth segment through a custom segmentLoader.",
                                r = new ot.Z(s, null !== (i = null == n ? void 0 : n.canRetry) && void 0 !== i && i, null == n ? void 0 : n.xhr);
                            l(r)
                        },
                        resolve: t => {
                            if (c || a.isCancelled()) return;
                            c = !0, a.deregister(f);
                            ia(n.mimeType) && !0 === e || o({
                                resultType: "segment-loaded",
                                resultData: {
                                    responseData: t.data,
                                    size: t.size,
                                    requestDuration: t.duration
                                }
                            });
                            const i = t.data instanceof Uint8Array ? t.data : new Uint8Array(t.data);
                            _t(i, n.segment.isInit), o({
                                resultType: "segment-loaded",
                                resultData: {
                                    responseData: i,
                                    size: t.size,
                                    requestDuration: t.duration
                                }
                            })
                        },
                        fallback: () => {
                            c || a.isCancelled() || (c = !0, a.deregister(f), ma(i, n, r, s, a, e).then(o, l))
                        },
                        progress: e => {
                            c || a.isCancelled() || r.onProgress({
                                duration: e.duration,
                                size: e.size,
                                totalSize: e.totalSize
                            })
                        }
                    };
                    let d;
                    void 0 !== n.segment.range && (d = [n.segment.range], void 0 !== n.segment.indexRange && d.push(n.segment.indexRange));
                    const h = {
                            isInit: n.segment.isInit,
                            timeout: s.timeout,
                            byteRanges: d,
                            trackType: n.type,
                            url: i
                        },
                        m = t(h, u);

                    function f(e) {
                        c || (c = !0, c || "function" != typeof m || m(), l(e))
                    }
                    a.register(f)
                }))
            };

            function pa(e, t) {
                return null === e ? null : null === t.url ? e.baseUrl : (0, d.Z)(e.baseUrl, t.url)
            }
            const ga = function (e) {
                const t = ea(e),
                    i = fa(e),
                    n = {
                        loadSegment(e, t, n, s, a) {
                            const r = pa(e, t.segment);
                            return i(r, t, n, s, a)
                        },
                        parseSegment(e, t, i) {
                            var n, s;
                            const a = t.segment,
                                r = e.data,
                                o = e.isChunked;
                            if (null === r) return a.isInit ? {
                                segmentType: "init",
                                initializationData: null,
                                initializationDataSize: 0,
                                protectionData: [],
                                initTimescale: void 0
                            } : {
                                segmentType: "media",
                                chunkData: null,
                                chunkInfos: null,
                                chunkOffset: 0,
                                chunkSize: 0,
                                protectionData: [],
                                appendWindow: [void 0, void 0]
                            };
                            const l = r instanceof Uint8Array ? r : new Uint8Array(r);
                            if (a.isInit) {
                                const e = null === (s = null === (n = a.privateInfos) || void 0 === n ? void 0 : n.smoothInitSegment) || void 0 === s ? void 0 : s.timescale;
                                return {
                                    segmentType: "init",
                                    initializationData: r,
                                    initializationDataSize: r.byteLength,
                                    initTimescale: e,
                                    protectionData: []
                                }
                            }
                            const c = void 0 !== i ? ta(l, o, i, a, t.isLive) : null;
                            if (null === c || null === c.chunkInfos || void 0 === c.scaledSegmentTime) throw new Error("Smooth Segment without time information");
                            const u = c.nextSegments,
                                d = c.chunkInfos,
                                h = la(l, c.scaledSegmentTime),
                                m = u.length > 0 ? u : void 0;
                            return {
                                segmentType: "media",
                                chunkData: h,
                                chunkInfos: d,
                                chunkOffset: 0,
                                chunkSize: h.length,
                                protectionData: [],
                                predictedSegments: m,
                                appendWindow: [void 0, void 0]
                            }
                        }
                    };
                return {
                    manifest: {
                        loadManifest: nt({
                            customManifestLoader: e.manifestLoader
                        }, "text"),
                        parseManifest(i, n) {
                            var s;
                            const a = null !== (s = i.url) && void 0 !== s ? s : n.originalUrl,
                                r = i.receivedTime,
                                o = i.responseData,
                                l = "string" == typeof o ? (new DOMParser).parseFromString(o, "text/xml") : o,
                                c = t(l, a, r),
                                u = [];
                            return {
                                manifest: new at.ZP(c, {
                                    representationFilter: e.representationFilter
                                }, u),
                                url: a,
                                warnings: u
                            }
                        }
                    },
                    audio: n,
                    video: n,
                    text: {
                        loadSegment(t, i, n, s, a) {
                            const r = i.segment,
                                o = pa(t, r);
                            if (r.isInit || null === o) return Promise.resolve({
                                resultType: "segment-created",
                                resultData: null
                            });
                            return ia(i.mimeType) ? (0, tt.ZP)({
                                url: o,
                                responseType: "arraybuffer",
                                timeout: n.timeout,
                                connectionTimeout: n.connectionTimeout,
                                cancelSignal: s,
                                onProgress: a.onProgress
                            }).then((t => {
                                if (!0 !== e.checkMediaSegmentIntegrity) return {
                                    resultType: "segment-loaded",
                                    resultData: t
                                };
                                const n = new Uint8Array(t.responseData);
                                return _t(n, i.segment.isInit), {
                                    resultType: "segment-loaded",
                                    resultData: Object.assign(Object.assign({}, t), {
                                        responseData: n
                                    })
                                }
                            })) : (0, tt.ZP)({
                                url: o,
                                responseType: "text",
                                timeout: n.timeout,
                                connectionTimeout: n.connectionTimeout,
                                cancelSignal: s,
                                onProgress: a.onProgress
                            }).then((e => ({
                                resultType: "segment-loaded",
                                resultData: e
                            })))
                        },
                        parseSegment(e, t, i) {
                            var n;
                            const s = t.segment,
                                a = t.language,
                                r = t.mimeType,
                                o = void 0 === r ? "" : r,
                                c = t.codecs,
                                u = void 0 === c ? "" : c,
                                d = ia(t.mimeType),
                                h = e.data,
                                m = e.isChunked;
                            let f, p;
                            if (s.isInit) return {
                                segmentType: "init",
                                initializationData: null,
                                initializationDataSize: 0,
                                protectionData: [],
                                initTimescale: void 0
                            };
                            if (null === h) return {
                                segmentType: "media",
                                chunkData: null,
                                chunkInfos: null,
                                chunkOffset: 0,
                                chunkSize: 0,
                                protectionData: [],
                                appendWindow: [void 0, void 0]
                            };
                            let g, v, y, b, T = null;
                            if (d) {
                                let e;
                                e = "string" == typeof h ? (0, k.tG)(h) : h instanceof Uint8Array ? h : new Uint8Array(h), f = e.length;
                                const a = void 0 !== i ? ta(e, m, i, s, t.isLive) : null;
                                p = null == a ? void 0 : a.nextSegments, T = null !== (n = null == a ? void 0 : a.chunkInfos) && void 0 !== n ? n : null, null === T ? m ? l.Z.warn("Smooth: Unavailable time data for current text track.") : (g = s.time, v = s.end) : (g = T.time, v = void 0 !== T.duration ? T.time + T.duration : s.end);
                                const r = u.toLowerCase();
                                if ("application/ttml+xml+mp4" === o || "stpp" === r || "stpp.ttml.im1t" === r) b = "ttml";
                                else {
                                    if ("wvtt" !== r) throw new Error(`could not find a text-track parser for the type ${o}`);
                                    b = "vtt"
                                }
                                const c = (0, Ns.Le)(e);
                                y = null === c ? "" : (0, k.uR)(c)
                            } else {
                                let e;
                                if (g = s.time, v = s.end, "string" != typeof h) {
                                    const t = h instanceof Uint8Array ? h : new Uint8Array(h);
                                    f = t.length, e = (0, k.uR)(t)
                                } else e = h;
                                switch (o) {
                                case "application/x-sami":
                                case "application/smil":
                                    b = "sami";
                                    break;
                                case "application/ttml+xml":
                                    b = "ttml";
                                    break;
                                case "text/vtt":
                                    b = "vtt"
                                }
                                if (void 0 === b) {
                                    if ("srt" !== u.toLowerCase()) throw new Error(`could not find a text-track parser for the type ${o}`);
                                    b = "srt"
                                }
                                y = e
                            }
                            return {
                                segmentType: "media",
                                chunkData: {
                                    type: b,
                                    data: y,
                                    start: g,
                                    end: v,
                                    language: a
                                },
                                chunkSize: f,
                                chunkInfos: T,
                                chunkOffset: null != g ? g : 0,
                                protectionData: [],
                                predictedSegments: Array.isArray(p) && p.length > 0 ? p : void 0,
                                appendWindow: [void 0, void 0]
                            }
                        }
                    }
                }
            };

            function va(e) {
                void 0 === e.transports.smooth && (e.transports.smooth = ga), e.mainThreadMediaSourceInit = n.Z, e.codecSupportProber = s.Z
            }
        }
    }
]);