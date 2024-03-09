"use strict";
(globalThis.__LOADABLE_LOADED_CHUNKS__ = globalThis.__LOADABLE_LOADED_CHUNKS__ || []).push([
	[3227], {
		59993: (r, e, t) => {
			t.d(e, {
				Ko: () => A,
				NH: () => l,
				RA: () => R,
				VL: () => P,
				b4: () => I,
				jQ: () => T,
				w0: () => u,
				xh: () => D
			});
			var E = t(37675),
				i = t.n(E),
				n = t(20678),
				o = t.n(n),
				a = t(57067),
				_ = t(96240),
				s = t(56154),
				c = t(83285),
				S = t(71105);
			const R = "device/DETECT_DEVICE_FORMAT",
				l = () => {
					const {
						innerWidth: r
					} = window, e = [];
					o()(i()(S.Ii), (t => {
						let [E, i] = t;
						return e.push(E), r > i
					})), e.reverse();
					const t = [];
					return o()(_.AV, ((e, E) => (t.push(E), r > e))), t.reverse(), {
						type: R,
						deviceFormat: {
							breakpoints: e,
							zedBreakpoints: t,
							mediaWidth: r,
							actualWidth: (0, _.rS)()
						}
					}
				},
				u = "device/DETECT_DEVICE_CAPABILITIES",
				T = () => {
					const r = function(r, e) {
						const t = performance.now(),
							E = [],
							i = e(),
							n = [c.d6, c.N7, c.SZ];
						E.push((0, c.lf)()), E.push((0, c.lf)(!0)), n.forEach((r => {
							E.push((0, c.Dn)(i, r)), E.push((0, c.Dn)(i, r, !0))
						})), Promise.all(E).then((e => {
							let [E, i, n, o, _, S, R, l] = e;
							const T = ["device", "capabilities", s.OS_NAME, s.OS_VERSION, s.BROWSER_NAME.replace(/\s+/g, "")],
								I = [
									[...T, "start_detection"]
								],
								A = (0, c.ly)(c.d6, n),
								P = (0, c.ly)(c.N7, _),
								D = A || P,
								O = !!n || !!_,
								d = D || O,
								p = (0, c.VP)(n),
								y = (0, c.VP)(_);
							n && I.push([...T, "drm", "widevine", p ? "cbcs" : "cenc", A ? "l1" : "l3"]), _ && I.push([...T, "drm", "playready", y ? "cbcs" : "cenc", P ? "l1" : "l3"]), R ? I.push([...T, "drm", "fairplay", "cbcs", "l1"]) : s.IS_FAIRPLAY_SUPPORTED && I.push([...T, "drm", "fairplay", "cbcs", "native-l1"]), s.IS_HEVC_SUPPORTED && I.push([...T, "codecs", "hevc"]), s.IS_AV1_SUPPORTED && I.push([...T, "codecs", "av1"]), I.forEach((r => a.z.sendIncrement(r, null, !0))), a.z.sendTiming([...T, "end_detection"], performance.now() - t, null, !0), r({
								type: u,
								capabilities: {
									IS_AUTO_PLAY_SUPPORTED: E,
									IS_AUTO_PLAY_MUTED_SUPPORTED: i,
									IS_HARDWARE_WIDEVINE_EME_SUPPORTED: A,
									IS_SOFTWARE_WIDEVINE_EME_SUPPORTED: !!n,
									IS_WIDEVINE_CBCS_EME_SUPPORTED: p,
									IS_WIDEWINE_PERSISTENT_LICENSE_SUPPORTED: !!o,
									IS_HARDWARE_PLAYREADY_EME_SUPPORTED: P,
									IS_SOFTWARE_PLAYREADY_EME_SUPPORTED: !!_,
									IS_PLAYREADY_CBCS_EME_SUPPORTED: y,
									IS_PLAYREADY_PERSISTENT_LICENSE_SUPPORTED: !!S,
									IS_FAIRPLAY_EME_SUPPORTED: !!R,
									IS_FAIRPLAY_PERSISTENT_LICENSE_SUPPORTED: !!l,
									IS_HARDWARE_EME_SUPPORTED: D,
									IS_SOFTWARE_EME_SUPPORTED: O,
									IS_EME_SUPPORTED: d
								}
							})
						}))
					};
					return r.type = "device/DETECT_DEVICE_CAPABILITIES_THUNK", r
				},
				I = "device/DETECT_DEVICE",
				A = r => {
					let {
						search: e = ""
					} = r;
					const t = new URLSearchParams(e),
						E = {
							type: I,
							name: "desktop",
							isMobileNative: !1,
							isDigitalMediaPlayer: !1
						};
					if (t.has(S.II)) {
						const r = t.get(S.II).toLowerCase();
						E.name = r, E.isMobileNative = S.Sb.some((e => e === r)), E.isDigitalMediaPlayer = r === S.RG
					}
					return E
				},
				P = "device/RETRY_ON_SOFTWARE",
				D = () => ({
					type: P
				})
		},
		80953: (r, e, t) => {
			t.r(e), t.d(e, {
				default: () => N
			});
			var E = t(75080),
				i = t.n(E),
				n = t(68097),
				o = t.n(n),
				a = t(38554),
				_ = t(68685),
				s = t(5632),
				c = t(59993),
				S = t(50822),
				R = t(21239);
			const {
				MEDIA: l,
				MANIFEST: u,
				DRM: T
			} = i().util.Error.Category, {
				MEDIA_SOURCE_OPERATION_FAILED: I,
				MEDIA_SOURCE_OPERATION_THREW: A,
				RESTRICTIONS_CANNOT_BE_MET: P,
				REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE: D,
				FAILED_TO_GENERATE_LICENSE_REQUEST: O,
				CONTENT_UNSUPPORTED_BY_BROWSER: d
			} = i().util.Error.Code;
			class p extends s.Oy {
				constructor() {
					var r, e, t;
					super(...arguments), r = this, t = r => {
						let {
							type: e,
							target: t
						} = r;
						const {
							detail: {
								category: E,
								code: i
							} = {}
						} = t;
						(E === l && i === I || E === l && i === A || E === u && i === P || E === T && i === D || E === T && i === O) && this.options.dispatcher((0, c.xh)()), super.retry({
							type: e,
							target: t
						})
					}, (e = function(r) {
						var e = function(r, e) {
							if ("object" != typeof r || null === r) return r;
							var t = r[Symbol.toPrimitive];
							if (void 0 !== t) {
								var E = t.call(r, "string");
								if ("object" != typeof E) return E;
								throw new TypeError("@@toPrimitive must return a primitive value.")
							}
							return String(r)
						}(r);
						return "symbol" == typeof e ? e : String(e)
					}(e = "retry")) in r ? Object.defineProperty(r, e, {
						value: t,
						enumerable: !0,
						configurable: !0,
						writable: !0
					}) : r[e] = t
				}
				onShakaEngineLoadError(r) {
					const {
						category: e,
						code: t
					} = r;
					e === u && t === d && "h265" === this.source.container && this.options.dispatcher((0, S.Tu)()), R.w.runMethodOnAdapter("errorListener", r)
				}
			}
			var y = t(146);
			window.shaka = i();
			const h = {
					[i().util.Error.Category.NETWORK]: a.ERROR_DETAILS.Gx,
					[i().util.Error.Category.TEXT]: a.ERROR_DETAILS.RU,
					[i().util.Error.Category.MEDIA]: a.ERROR_DETAILS.zc,
					[i().util.Error.Category.MANIFEST]: a.ERROR_DETAILS.GI,
					[i().util.Error.Category.STREAMING]: a.ERROR_DETAILS.Wn,
					[i().util.Error.Category.DRM]: a.ERROR_DETAILS.zY,
					[i().util.Error.Category.PLAYER]: a.ERROR_DETAILS.G_,
					[i().util.Error.Category.STORAGE]: a.ERROR_DETAILS.Vg
				},
				g = r => h[r] || r,
				v = r => Object.keys(i().util.Error.Code).find((e => i().util.Error.Code[e] === r)) || r,
				f = r => {
					let {
						name: e,
						message: t
					} = r;
					return `${e}: ${t}`
				};
			class C extends y.Z {
				constructor() {
					var r, e, t;
					super(...arguments), r = this, t = r => {
						let {
							severity: e,
							category: t
						} = r;
						return e === i().util.Error.Severity.CRITICAL || t === i().util.Error.Category.NETWORK
					}, (e = function(r) {
						var e = function(r, e) {
							if ("object" != typeof r || null === r) return r;
							var t = r[Symbol.toPrimitive];
							if (void 0 !== t) {
								var E = t.call(r, "string");
								if ("object" != typeof E) return E;
								throw new TypeError("@@toPrimitive must return a primitive value.")
							}
							return String(r)
						}(r);
						return "symbol" == typeof e ? e : String(e)
					}(e = "isShakaErrorFatal")) in r ? Object.defineProperty(r, e, {
						value: t,
						enumerable: !0,
						configurable: !0,
						writable: !0
					}) : r[e] = t
				}
				buildEngine() {
					this.engineName = "ShakaEngine", this.engine = new p
				}
				getYouboraAdapter() {
					return new(o())(this.engine.getInstance())
				}
				convertEngineErrorToPlayerError(r) {
					const e = r && r.detail || r;
					if (r && r.error) return super.convertEngineErrorToPlayerError(r);
					if (!(e instanceof i().util.Error)) return super.convertEngineErrorToPlayerError({
						error: e
					});
					const {
						code: t,
						category: E,
						data: n = []
					} = e, o = (n || []).map((r => {
						if (r instanceof i().util.Error) {
							const {
								code: e,
								category: t,
								data: E
							} = r, i = `${g(t)}: ${v(e)}`;
							return E[0] instanceof Error ? `${i} | ${f(E[0])}` : i
						}
						if (r instanceof Error) return f(r);
						if ("object" == typeof r) try {
							return JSON.stringify(r)
						} catch {}
						return r
					})).join("||");
					return (0, _.Kv)(g(E), this.engineName, v(t), o, this.isShakaErrorFatal(e))
				}
			}
			const N = C
		}
	}
]);
//# sourceMappingURL=sourcemaps/player-shaka-97bad1b42f.bundle.js.map